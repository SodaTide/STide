"""frontmatter 的极简 YAML 读写（只覆盖站点使用的字段，无 PyYAML 依赖）。"""

from __future__ import annotations

import json
import re
from typing import Any

from .errors import ValidationError
from .media import MediaFile
from .schema import Link, PostDraft

DATE_FIELDS = {"date", "at"}
SCALAR_FIELDS = {
    "id",
    "persona",
    "variant",
    "title",
    "date",
    "lang",
    "kind",
    "summary",
    "visibility",
    "pinned",
}


def _quote(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def _scalar(key: str, value: Any) -> str:
    if value is None:
        return f"{key}: null"
    if isinstance(value, bool):
        return f"{key}: {'true' if value else 'false'}"
    if isinstance(value, (int, float)):
        return f"{key}: {value}"
    text = str(value)
    if key in DATE_FIELDS or (re.fullmatch(r"[a-z0-9_.-]+", text) and key in SCALAR_FIELDS):
        return f"{key}: {text}"
    return f"{key}: {_quote(text)}"


def _strip_quotes(value: str) -> Any:
    value = value.strip()
    if not value:
        return None
    if value == "null":
        return None
    if value in ("true", "false"):
        return value == "true"
    if value.startswith('"'):
        try:
            return json.loads(value)
        except ValueError:
            return value.strip('"')
    if value.startswith("'") and value.endswith("'"):
        return value[1:-1]
    if re.fullmatch(r"-?\d+", value):
        return int(value)
    if re.fullmatch(r"-?\d+\.\d+", value):
        return float(value)
    return value


def render(post: PostDraft, *, body: str | None = None) -> str:
    lines = ["---"]
    ordered = [
        ("id", post.id),
        ("persona", post.persona),
        ("variant", post.variant),
        ("title", post.title),
        ("date", post.date.isoformat() if hasattr(post.date, "isoformat") else post.date),
        ("lang", post.lang),
        ("kind", post.kind),
        ("summary", post.summary),
    ]
    for key, value in ordered:
        if value not in (None, ""):
            lines.append(_scalar(key, value))

    if post.media:
        lines.append("media:")
        for item in post.media:
            lines.append(f"  - src: {_quote(item.path)}")
            lines.append(f"    alt: {_quote(item.alt)}")
            lines.append(f"    width: {item.width}")
            lines.append(f"    height: {item.height}")
            if item.caption:
                lines.append(f"    caption: {_quote(item.caption)}")
    else:
        lines.append("media: []")

    if post.link:
        lines.append("link:")
        lines.append(f"  url: {_quote(post.link.url)}")
        if post.link.title:
            lines.append(f"  title: {_quote(post.link.title)}")
        if post.link.site:
            lines.append(f"  site: {_quote(post.link.site)}")
    else:
        lines.append("link: null")

    if post.source:
        lines.append("source:")
        for key in ("instance", "session_hash", "group_alias"):
            if post.source.get(key):
                lines.append(f"  {key}: {_quote(str(post.source[key]))}")
    if post.generated:
        lines.append("generated:")
        if post.generated.get("model"):
            lines.append(f"  model: {_quote(str(post.generated['model']))}")
        if post.generated.get("at"):
            lines.append(f"  at: {_quote(str(post.generated['at']))}")

    lines.append(_scalar("visibility", post.visibility))
    lines.append(_scalar("pinned", post.pinned))
    lines.append("---")
    lines.append("")
    lines.append(body if body is not None else post.body)
    if not lines[-1].endswith("\n"):
        lines.append("")
    return "\n".join(lines)


def split_frontmatter(text: str) -> tuple[str, str]:
    normalized = text.replace("\r\n", "\n")
    if not normalized.startswith("---\n"):
        raise ValidationError("缺少 frontmatter（文件必须以 --- 开头）。", code="BAD_FRONTMATTER")
    end = normalized.find("\n---", 4)
    if end < 0:
        raise ValidationError("frontmatter 没有闭合的 ---。", code="BAD_FRONTMATTER")
    head = normalized[4:end].rstrip("\n")
    body = normalized[end + 4 :]
    if body.startswith("\n"):
        body = body[1:]
    return head, body


def parse(text: str) -> tuple[dict, str]:
    head, body = split_frontmatter(text)
    data: dict[str, Any] = {}
    current: str | None = None
    current_map: dict | None = None
    current_list: list | None = None

    for raw in head.split("\n"):
        if not raw.strip() or raw.lstrip().startswith("#"):
            continue
        if raw.startswith("  - "):
            if current_list is None:
                raise ValidationError("media 列表缩进不对。", code="BAD_FRONTMATTER")
            key, _, value = raw[4:].partition(":")
            current_list.append({key.strip(): _strip_quotes(value)})
            current_map = current_list[-1]
            continue
        if raw.startswith("    "):
            if current_map is None:
                raise ValidationError("frontmatter 子字段缩进不对。", code="BAD_FRONTMATTER")
            key, _, value = raw.strip().partition(":")
            current_map[key.strip()] = _strip_quotes(value)
            continue
        if raw.startswith("  "):
            if current_map is None:
                raise ValidationError("frontmatter 子字段缩进不对。", code="BAD_FRONTMATTER")
            key, _, value = raw.strip().partition(":")
            current_map[key.strip()] = _strip_quotes(value)
            continue

        key, sep, value = raw.partition(":")
        if not sep:
            continue
        key = key.strip()
        value = value.strip()
        current = key
        current_map = None
        current_list = None
        if key == "media":
            if value in ("[]", ""):
                data[key] = []
            else:
                raise ValidationError("media 只支持块状列表。", code="BAD_FRONTMATTER")
            current_list = data[key]
            continue
        if value in ("", "{}"):
            data[key] = {}
            current_map = data[key]
            continue
        data[key] = _strip_quotes(value)

    media_raw = data.get("media") or []
    media: list[MediaFile] = []
    for item in media_raw:
        src = str(item.get("src") or "")
        media.append(
            MediaFile(
                path=src,
                data=b"",
                mime="",
                width=int(item.get("width") or 0),
                height=int(item.get("height") or 0),
                sha256="",
                ext="",
                alt=str(item.get("alt") or ""),
                caption=str(item["caption"]) if item.get("caption") else None,
            )
        )
    link_raw = data.get("link")
    link = None
    if isinstance(link_raw, dict) and link_raw.get("url"):
        link = Link(
            url=str(link_raw["url"]),
            title=str(link_raw["title"]) if link_raw.get("title") else None,
            site=str(link_raw["site"]) if link_raw.get("site") else None,
        )
    draft = PostDraft(
        id=str(data["id"]) if data.get("id") else None,
        persona=str(data.get("persona") or ""),
        variant=str(data.get("variant") or "main"),
        title=str(data["title"]) if data.get("title") else None,
        body=body.strip(),
        date=data.get("date"),
        lang=str(data.get("lang") or "zh-CN"),
        kind=str(data["kind"]) if data.get("kind") else None,
        summary=str(data["summary"]) if data.get("summary") else None,
        media=tuple(media),
        link=link,
        visibility=str(data.get("visibility") or "public"),
        pinned=bool(data.get("pinned")),
        source=dict(data.get("source") or {}),
        generated=dict(data.get("generated") or {}),
    )
    return draft, body
