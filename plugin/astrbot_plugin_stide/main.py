"""AstrBot 插件入口。"""

from __future__ import annotations

import asyncio
import json
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
from .stide_core.people import load_people
from .stide_core.publish import Publisher


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

    def _resolve(self, event):
        umo = getattr(event, "unified_msg_origin", "") or ""
        return umo, resolve_persona(
            umo,
            self.bindings,
            self.default_persona,
            allow_llm_persona_override=bool(self.config.get("allow_llm_persona_override", False)),
        )

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
            umo, who = self._resolve(event)
        except NoPersona as exc:
            return {"ok": False, "code": "NO_PERSONA", "message": str(exc)}
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
            result = await asyncio.wait_for(asyncio.to_thread(core_publish, self._config(), draft), 30)
            self.limiter.record(who.persona)
            name = who.persona
            try:
                name = self._publisher_for().people()[who.persona]["name"]
            except Exception:
                pass
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
