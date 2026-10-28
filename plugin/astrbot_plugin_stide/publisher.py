"""把插件配置接到 vendor 进来的 stide_core。"""

from __future__ import annotations

from pathlib import Path
from typing import Any

from .bindings import session_hash
from .stide_core.config import Config
from .stide_core.publish import Publisher
from .stide_core.schema import Link, PostDraft


def make_config(raw: dict[str, Any], instance_id: str) -> Config:
    token = raw.get("github_token") or ""
    return Config(
        token=token or None,
        repo=raw.get("repo") or None,
        branch=raw.get("branch") or "main",
        instance=instance_id,
        salt=raw.get("salt") or None,
        content_dir=Path(raw.get("content_dir") or "content"),
        site_url=raw.get("site_url") or "",
    )


def build_draft(
    persona: str,
    variant: str,
    *,
    title: str | None,
    body: str,
    kind: str | None,
    media: list[Any],
    link: str | None,
    umo: str,
    instance: str,
    salt: str,
    group_alias: str | None,
    model: str | None,
) -> PostDraft:
    return PostDraft(
        persona=persona,
        variant=variant,
        title=title,
        body=body,
        kind=kind,
        media=tuple(media),
        link=Link(url=link) if link else None,
        source={
            "instance": instance,
            "session_hash": session_hash(umo, salt) if salt else "",
            "group_alias": group_alias or "",
        },
        generated={"model": model or "unknown"},
    )


def publish(config: Config, draft: PostDraft) -> dict:
    return Publisher(config).publish(draft, model=draft.generated.get("model"))
