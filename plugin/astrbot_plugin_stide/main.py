"""AstrBot 插件入口。"""

from __future__ import annotations

import asyncio
import hashlib
import json
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path

from astrbot.api import AstrBotConfig, logger
from astrbot.api.event import filter
from astrbot.api.star import Context, Star

try:  # AstrBot 版本差异；只在发图时需要
    from astrbot.api.message_components import Image
except Exception:  # pragma: no cover
    Image = None  # type: ignore[assignment]

from . import tools
from .bindings import NoPersona, resolve_persona
from .guards import Deduper, GuardError, RateLimiter, check_banned
from .publisher import build_draft, make_config, publish as core_publish
from .stide_core.persona import PersonaSpec
from .stide_core.publish import Publisher


@dataclass
class Author:
    persona: str
    variant: str = "main"
    auto_persona: PersonaSpec | None = None


class StidePlugin(Star):
    def __init__(self, context: Context, config: AstrBotConfig):
        super().__init__(context)
        self.context = context
        self.config: AstrBotConfig = config
        self.instance_id = str(config.get("instance_id") or "astrbot-main")
        self.paused = bool(config.get("paused", False))
        self.bindings = list(config.get("bindings") or [])
        self.default_persona = config.get("default_persona")
        self.limiter = RateLimiter(
            daily_limit_per_persona=int(config.get("daily_limit_per_persona", 6)),
            min_interval_minutes=int(config.get("min_interval_minutes", 5)),
            daily_limit_global=int(config.get("daily_limit_global", 40)),
        )
        self.deduper = Deduper()
        self._publisher: Publisher | None = None
        tools.configure(self)
        self.context.add_llm_tools(
            tools.StidePublish(),
            tools.StideList(),
            tools.StideEdit(),
            tools.StideHide(),
        )

    # -- helpers ---------------------------------------------------------
    def _config(self):
        return make_config(dict(self.config), self.instance_id)

    def _publisher_for(self) -> Publisher:
        if self._publisher is None:
            self._publisher = Publisher(self._config())
        return self._publisher

    async def _resolve(self, event):
        umo = getattr(event, "unified_msg_origin", "") or ""
        try:
            bound = resolve_persona(
                umo,
                self.bindings,
                self.default_persona,
                allow_llm_persona_override=bool(self.config.get("allow_llm_persona_override", False)),
            )
            return umo, Author(bound.persona, bound.variant)
        except NoPersona:
            if not bool(self.config.get("allow_self_registration", True)):
                raise
            auto = await self._auto_author(event, umo)
            if auto is None:
                raise
            return umo, auto

    async def _auto_author(self, event, umo: str) -> Author | None:
        """没有显式绑定时，按 AstrBot 当前人格自动生成 STide 身份。

        身份来自 persona_manager，而不是模型输出：模型不能指定 id、hue 或
        任意已有作者名。首次发布时 core 会在同一个 commit 里写 people/*.json。
        """
        manager = getattr(self.context, "persona_manager", None)
        if manager is None or not hasattr(manager, "resolve_selected_persona"):
            return None
        conversation = getattr(event, "conversation", None)
        conversation_persona_id = getattr(conversation, "persona_id", None) if conversation else None
        platform_name = ""
        getter = getattr(event, "get_platform_name", None)
        if callable(getter):
            try:
                platform_name = str(getter() or "")
            except Exception:
                platform_name = ""
        try:
            resolved = await manager.resolve_selected_persona(
                umo=umo,
                conversation_persona_id=conversation_persona_id,
                platform_name=platform_name,
            )
        except TypeError:
            try:
                resolved = await manager.resolve_selected_persona(umo=umo)
            except Exception as exc:  # pragma: no cover - 依赖 AstrBot 版本
                logger.info(f"[Stide] 人格解析失败：{exc}")
                return None
        except Exception as exc:  # pragma: no cover
            logger.info(f"[Stide] 人格解析失败：{exc}")
            return None
        try:
            persona_id, persona, _, _ = resolved
        except (TypeError, ValueError):
            return None
        if isinstance(persona, dict):
            name = persona.get("name")
        else:
            name = getattr(persona, "name", None)
        name = str(name or persona_id or "").strip()
        if not name:
            return None
        seed = f"{self.instance_id}:{persona_id or name}"
        auto_id = "auto_" + hashlib.sha256(seed.encode("utf-8")).hexdigest()[:10]
        hue = int(hashlib.sha256(auto_id.encode("utf-8")).hexdigest(), 16) % 360
        spec = PersonaSpec(
            id=auto_id,
            name=name[:40],
            hue=hue,
            signature="由 AstrBot 自动注册",
            bio=f"{name[:40]} 的公开日志。",
            lang="zh-CN",
        )
        return Author(auto_id, "auto", spec)

    async def _media_paths(self, event, refs: list[str]) -> list[Path]:
        if not refs:
            return []
        if Image is None:
            raise GuardError("MEDIA_UNAVAILABLE", "当前 AstrBot 不支持图片组件。")
        messages = event.get_messages()
        images = [item for item in messages if isinstance(item, Image)]
        paths = []
        for ref in refs:
            try:
                index = int(ref.split(":", 1)[1])
            except (IndexError, ValueError):
                raise GuardError("MEDIA_REF", f"媒体引用不合法：{ref}")
            if index >= len(images):
                raise GuardError("MEDIA_REF", f"没有第 {index} 张图。")
            path = await images[index].convert_to_file_path()
            paths.append(Path(path))
        return paths

    # -- tool dispatcher -------------------------------------------------
    async def dispatch(self, tool: str, event, kwargs: dict) -> dict:
        if self.paused:
            return {"ok": False, "code": "PAUSED", "message": "发布器已暂停。"}
        try:
            umo, who = await self._resolve(event)
        except NoPersona:
            return {
                "ok": False,
                "code": "NO_PERSONA",
                "message": (
                    "无法确定作者：这个会话没有显式绑定，AstrBot 也没有可解析的当前人格。"
                    "请所有者检查 AstrBot 人格设置，或在插件配置 bindings 里绑定 umo；"
                    "工具不接受 persona 参数，模型不能自己选作者。"
                ),
            }
        if tool == "publish":
            return await self._publish(event, umo, who, kwargs)
        if tool == "list":
            return await self._list(who, kwargs)
        if tool == "edit":
            return await self._edit(who, kwargs)
        if tool == "hide":
            return await self._edit(who, kwargs, hide=True)
        return {"ok": False, "code": "UNKNOWN_TOOL", "message": tool}

    async def _publish(self, event, umo: str, who, kwargs: dict) -> dict:
        body = str(kwargs.get("body") or "").strip()
        if not body:
            return {"ok": False, "code": "EMPTY_BODY", "message": "正文不能为空。"}
        media_refs = [str(x) for x in (kwargs.get("media") or [])]
        paths = await self._media_paths(event, media_refs)
        try:
            check_banned(body, [str(p) for p in (self.config.get("banned_patterns") or [])])
            self.deduper.check(body)
            self.limiter.check(who.persona)
        except GuardError as exc:
            return {"ok": False, "code": exc.code, "message": exc.message, "retry_after": exc.retry_after}
        try:
            from .stide_core.media import load_media

            media = []
            for index, path in enumerate(paths):
                item = load_media(path, max_bytes=int(self.config.get("media_max_bytes", 2 * 1024 * 1024)))
                media.append(
                    item.__class__(
                        path=item.path,
                        data=item.data,
                        mime=item.mime,
                        width=item.width,
                        height=item.height,
                        sha256=item.sha256,
                        ext=item.ext,
                        alt=str(kwargs.get("alt") or f"图 {index + 1}"),
                    )
                )
            draft = build_draft(
                who.persona,
                who.variant,
                title=kwargs.get("title"),
                body=body,
                kind=kwargs.get("kind"),
                media=media,
                link=kwargs.get("link"),
                umo=umo,
                instance=self.instance_id,
                salt=str(self.config.get("salt") or ""),
                group_alias=kwargs.get("group_alias"),
                model=kwargs.get("model"),
            )
            result = await asyncio.wait_for(
                asyncio.to_thread(
                    core_publish,
                    self._config(),
                    draft,
                    auto_persona=who.auto_persona,
                ),
                30,
            )
            self.limiter.record(who.persona)
            name = (result.get("author") or {}).get("name") or who.persona
            return {**result, "author": {"id": who.persona, "name": name}}
        except asyncio.TimeoutError:
            return {"ok": False, "code": "TIMEOUT", "message": "还在提交，稍后用 stide_list 看结果，不要重发。"}
        except Exception as exc:
            return {"ok": False, "code": getattr(exc, "code", "ERROR"), "message": str(exc)}

    async def _list(self, who, kwargs: dict) -> dict:
        try:
            limit = max(1, min(20, int(kwargs.get("limit") or 5)))
            rows = await asyncio.to_thread(self._publisher_for().list_posts, who.persona, limit)
            return {"ok": True, "posts": rows}
        except Exception as exc:
            return {"ok": False, "code": getattr(exc, "code", "ERROR"), "message": str(exc)}

    async def _edit(self, who, kwargs: dict, hide: bool = False) -> dict:
        post_id = str(kwargs.get("id") or "")
        if not post_id:
            return {"ok": False, "code": "BAD_ID", "message": "缺 id。"}
        try:
            pub = self._publisher_for()
            path, draft = await asyncio.to_thread(pub.find, post_id)
            if draft.persona != who.persona:
                return {"ok": False, "code": "FORBIDDEN", "message": "只能改自己的。"}
            if not hide and draft.date:
                when = draft.date
                if isinstance(when, str):
                    when = datetime.fromisoformat(when)
                if when.tzinfo is None:
                    when = when.replace(tzinfo=timezone.utc)
                if datetime.now(timezone.utc) - when > timedelta(hours=24):
                    return {"ok": False, "code": "TOO_OLD", "message": "只能改 24 小时内的。"}
            if hide:
                result = await asyncio.to_thread(pub.hide, post_id)
            else:
                result = await asyncio.to_thread(
                    pub.edit, post_id, title=kwargs.get("title"), body=kwargs.get("body")
                )
            return result
        except Exception as exc:
            return {"ok": False, "code": getattr(exc, "code", "ERROR"), "message": str(exc)}

    # -- commands --------------------------------------------------------
    @filter.command_group("stide")
    async def stide_group(self, event):
        yield event.plain_result("用法：/stide status | pause | resume")

    @stide_group.command("status")
    @filter.permission_type(filter.PermissionType.ADMIN)
    async def stide_status(self, event):
        counts = self.limiter._counts
        yield event.plain_result(
            f"STide: {'paused' if self.paused else 'running'}；"
            f"今日 {sum(counts.values())} 篇；实例 {self.instance_id}"
        )

    @stide_group.command("pause")
    @filter.permission_type(filter.PermissionType.ADMIN)
    async def stide_pause(self, event):
        self.paused = True
        self.config["paused"] = True
        self.config.save_config()
        yield event.plain_result("已暂停本实例发布。")

    @stide_group.command("resume")
    @filter.permission_type(filter.PermissionType.ADMIN)
    async def stide_resume(self, event):
        self.paused = False
        self.config["paused"] = False
        self.config.save_config()
        yield event.plain_result("已恢复。")

    async def terminate(self):
        logger.info("STide 插件已卸载")
