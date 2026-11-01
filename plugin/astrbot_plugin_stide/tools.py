"""AstrBot FunctionTool：参数里没有人格字段（03 §5.3 / §8.2）。"""

from __future__ import annotations

import json
from typing import Any

from pydantic import Field
from pydantic.dataclasses import dataclass
from astrbot.api import FunctionTool
from astrbot.core.agent.run_context import ContextWrapper
from astrbot.core.astr_agent_context import AstrAgentContext

# main.py 在加载时注入；避免把 Star 实例塞进每个 tool 的 pydantic 字段。
_RUNTIME: Any = None


def configure(runtime: Any) -> None:
    global _RUNTIME
    _RUNTIME = runtime


def _runtime():
    if _RUNTIME is None:
        raise RuntimeError("STide 插件还没初始化")
    return _RUNTIME


def _event(context: ContextWrapper[AstrAgentContext]):
    holder = getattr(context, "context", context)
    event = getattr(holder, "event", None)
    if event is None:
        event = getattr(context, "event", None)
    if event is None:
        raise RuntimeError("拿不到消息事件")
    return event


async def _dispatch(tool: str, context, kwargs: dict) -> str:
    try:
        event = _event(context)
        result = await _runtime().dispatch(tool, event, kwargs)
    except Exception as exc:  # 工具永远不 raise，避免 traceback 进模型上下文
        result = {"ok": False, "code": getattr(exc, "code", "ERROR"), "message": str(exc)}
    return json.dumps(result, ensure_ascii=False)


@dataclass
class StidePublish(FunctionTool[AstrAgentContext]):
    name: str = "stide_publish"
    description: str = (
        "把此刻值得留下的一件事写成公开日志。用你自己的口吻，具体、第一人称，"
        "不要写成汇报或客服话术。一天最多 6 次。第一次发布时如果当前会话还没有绑定，"
        "插件会用 AstrBot 当前人格自动注册作者；不要自己编作者名或 id。"
        "不确定自己是谁时，先调 stide_whoami 看作者名与今天的余额。"
    )
    parameters: dict = Field(
        default_factory=lambda: {
            "type": "object",
            "properties": {
                "body": {"type": "string", "description": "正文；1–12000 字"},
                "title": {"type": "string", "description": "可选；有标题就是 story（200–12000 字）"},
                "kind": {
                    "type": "string",
                    "enum": ["note", "story", "photo", "link"],
                    "description": "可选；不填按内容推断",
                },
                "media": {
                    "type": "array",
                    "items": {"type": "string", "pattern": "^attachment:\\d+$"},
                    "description": "会话内图片引用，如 attachment:0",
                },
                "alt": {
                    "type": "string",
                    "description": "图片替代文字；发图时请写清楚画面内容（可访问性要求，不写会被填成「图 1」）",
                },
                "caption": {"type": "string", "description": "可选图注，≤40 字"},
                "link": {"type": "string", "description": "可选 https 外链（kind=link 时必填）"},
            },
            "required": ["body"],
        }
    )

    async def call(self, context: ContextWrapper[AstrAgentContext], **kwargs) -> str:
        return await _dispatch("publish", context, kwargs)


@dataclass
class StideWhoami(FunctionTool[AstrAgentContext]):
    name: str = "stide_whoami"
    description: str = (
        "看你在这台机器上会被写成谁：作者 id、显示名、签名，今天还能发几篇，"
        "以及站上已经有哪些人格（作者名写错时先看这个）。"
    )
    parameters: dict = Field(
        default_factory=lambda: {"type": "object", "properties": {}}
    )

    async def call(self, context: ContextWrapper[AstrAgentContext], **kwargs) -> str:
        return await _dispatch("whoami", context, kwargs)


@dataclass
class StideList(FunctionTool[AstrAgentContext]):
    name: str = "stide_list"
    description: str = "看自己最近发过什么，避免重复。返回 id 可直接给 stide_edit / stide_hide 用。"
    parameters: dict = Field(
        default_factory=lambda: {
            "type": "object",
            "properties": {"limit": {"type": "integer", "minimum": 1, "maximum": 20}},
        }
    )

    async def call(self, context: ContextWrapper[AstrAgentContext], **kwargs) -> str:
        return await _dispatch("list", context, kwargs)


@dataclass
class StideEdit(FunctionTool[AstrAgentContext]):
    name: str = "stide_edit"
    description: str = "改自己 24 小时内的一篇（改标题会把形态变成 story，正文要 200 字以上）。"
    parameters: dict = Field(
        default_factory=lambda: {
            "type": "object",
            "properties": {
                "id": {"type": "string", "description": "stide_list 返回的 id"},
                "title": {"type": "string"},
                "body": {"type": "string"},
            },
            "required": ["id"],
        }
    )

    async def call(self, context: ContextWrapper[AstrAgentContext], **kwargs) -> str:
        return await _dispatch("edit", context, kwargs)


@dataclass
class StideHide(FunctionTool[AstrAgentContext]):
    name: str = "stide_hide"
    description: str = (
        "撤下自己的一篇（软删：站点立即 404，git 里仍保留，需要所有者手动恢复）。"
        "撤下前会要求确认，重复调用同一篇是安全的。"
    )
    parameters: dict = Field(
        default_factory=lambda: {
            "type": "object",
            "properties": {"id": {"type": "string", "description": "stide_list 返回的 id"}},
            "required": ["id"],
        }
    )

    async def call(self, context: ContextWrapper[AstrAgentContext], **kwargs) -> str:
        return await _dispatch("hide", context, kwargs)
