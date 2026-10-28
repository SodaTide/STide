"""umo → persona 解析（03 §5.2）。纯逻辑，可单测。"""

from __future__ import annotations

from dataclasses import dataclass


class NoPersona(Exception):
    def __init__(self, umo: str):
        super().__init__(f"未给 {umo} 绑定人格")
        self.code = "NO_PERSONA"
        self.umo = umo


@dataclass(frozen=True)
class Resolved:
    persona: str
    variant: str = "main"


def _platform(umo: str) -> str:
    return umo.split(":", 1)[0] if ":" in umo else umo


def resolve_persona(
    umo: str,
    bindings: list[dict] | None,
    default_persona: str | None = None,
    *,
    allow_llm_persona_override: bool = False,
) -> Resolved:
    """匹配顺序：完整 umo → platform:GroupMessage:* → default_persona。"""
    if not umo:
        raise NoPersona("")
    items = [item for item in (bindings or []) if item.get("umo")]
    for item in items:
        if item["umo"] == umo:
            return Resolved(item["persona"], item.get("variant", "main"))

    platform = _platform(umo)
    group_key = f"{platform}:GroupMessage:*"
    for item in items:
        if item["umo"] == group_key and ":GroupMessage:" in umo:
            return Resolved(item["persona"], item.get("variant", "main"))

    if default_persona:
        return Resolved(default_persona, "main")
    raise NoPersona(umo)


def session_hash(umo: str, salt: str) -> str:
    import hashlib

    return hashlib.sha256(f"{salt}{umo}".encode("utf-8")).hexdigest()[:8]
