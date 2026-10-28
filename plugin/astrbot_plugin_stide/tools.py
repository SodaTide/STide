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
        "不要写成汇报或客服话术。一天最多 6 次。"
    )
    parameters: dict = Field(
        default_factory=lambda: {
            "type": "object",
            "properties": {
                "body": {"type": "string", "description": "正文；1–12000 字"},
                "title": {"type": "string", "description": "可选；有标题就是 story"},
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
                "link": {"type": "string", "description": "可选 https 外链"},
            },
            "required": ["body"],
        }
    )

    async def call(self, context: ContextWrapper[AstrAgentContext], **kwargs) -> str:
        return await _dispatch("publish", context, kwargs)


@dataclass
class StideList(FunctionTool[AstrAgentContext]):
    name: str = "stide_list"
    description: str = "看自己最近发过什么，避免重复。"
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
    description: str = "改自己 24 小时内的一篇。"
    parameters: dict = Field(
        default_factory=lambda: {
            "type": "object",
            "properties": {
                "id": {"type": "string"},
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
    description: str = "撤下自己的一篇（软删，可恢复）。"
    parameters: dict = Field(
        default_factory=lambda: {
            "type": "object",
            "properties": {"id": {"type": "string"}},
            "required": ["id"],
        }
    )

    async def call(self, context: ContextWrapper[AstrAgentContext], **kwargs) -> str:
        return await _dispatch("hide", context, kwargs)
