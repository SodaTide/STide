"""frontmatter 校验与 kind 推断（唯一阈值来自 02 §12 / 03 §4.3）。"""

from __future__ import annotations

import hashlib
import re
import unicodedata
from dataclasses import dataclass, field, replace
from datetime import datetime, timedelta, timezone
from typing import Any

from .errors import ValidationError
from .media import MediaFile, ensure_post_budget

KINDS = ("note", "story", "photo", "link")
VISIBILITIES = ("public", "unlisted", "hidden")
PERSONA_RE = re.compile(r"^[a-z0-9][a-z0-9_]{0,63}$")
MAX_TITLE = 60
MAX_CAPTION = 40
MAX_MEDIA = 9
MAX_LINK = 2048
MAX_EXTERNAL_LINKS = 3
NOTE_MAX = 600
STORY_MIN = 200
STORY_MAX = 12000
CAPTIONED_MAX = 280


@dataclass(frozen=True)
class Link:
    url: str
    title: str | None = None
    site: str | None = None


@dataclass(frozen=True)
class PostDraft:
    persona: str
    body: str
    title: str | None = None
    kind: str | None = None
    lang: str = "zh-CN"
    summary: str | None = None
    media: tuple[MediaFile, ...] = ()
    link: Link | None = None
    visibility: str = "public"
    date: datetime | None = None
    variant: str = "main"
    id: str | None = None
    pinned: bool = False
    source: dict = field(default_factory=dict)
    generated: dict = field(default_factory=dict)


def infer_kind(draft: PostDraft) -> str:
    """显式合法 kind 优先；否则 link → photo → story → note。"""
    if draft.kind in KINDS:
        return draft.kind
    if draft.link and draft.link.url:
        return "link"
    if draft.media and not (draft.title or "").strip():
        return "photo"
    if (draft.title or "").strip():
        return "story"
    return "note"


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _parse_date(value: Any) -> datetime | None:
    if value is None or isinstance(value, datetime):
        return value
    try:
        parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except ValueError as exc:
        raise ValidationError(f"date 不是合法 ISO 时间：{value}", code="BAD_DATE") from exc
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed


def _external_links(body: str) -> list[str]:
    links = re.findall(r"\]\((https?://[^)\s]+)", body)
    links += re.findall(r"(?<!\()(?<!\]\()https?://[^\s)<>]+", body)
    seen: list[str] = []
    for link in links:
        if link not in seen:
            seen.append(link)
    return seen


def body_sha256(body: str) -> str:
    normalized = unicodedata.normalize("NFKC", body).replace("\r\n", "\n")
    normalized = "\n".join(line.rstrip() for line in normalized.split("\n")).strip()
    return hashlib.sha256(normalized.encode("utf-8")).hexdigest()


def validate(
    draft: PostDraft,
    *,
    people: dict[str, dict] | None = None,
    now: datetime | None = None,
    owner: bool = False,
) -> PostDraft:
    now = now or _now()
    persona = (draft.persona or "").strip()
    if not PERSONA_RE.match(persona):
        raise ValidationError(f"persona 不合法：{persona!r}", code="BAD_PERSONA")
    if people is not None:
        person = people.get(persona)
        if not person:
            raise ValidationError(
                f"未登记的人格：{persona}（可用：{', '.join(sorted(people))}）", code="NO_PERSONA"
            )
        if person.get("status", "active") != "active":
            raise ValidationError(f"人格已退休：{persona}", code="PERSONA_RETIRED")

    title = (draft.title or "").strip() or None
    if title:
        if "\n" in title or "\r" in title:
            raise ValidationError("title 不能换行。", code="BAD_TITLE")
        if len(title) > MAX_TITLE:
            raise ValidationError(f"title 超过 {MAX_TITLE} 字（{len(title)}）。", code="BAD_TITLE")

    body = (draft.body or "").strip()
    kind = infer_kind(replace(draft, title=title))
    if kind == "story":
        if not title:
            raise ValidationError("story 必须有 title。", code="NO_TITLE")
        if not STORY_MIN <= len(body) <= STORY_MAX:
            raise ValidationError(
                f"story 正文要 {STORY_MIN}–{STORY_MAX} 字（当前 {len(body)}）。", code="BAD_BODY"
            )
    elif kind == "note":
        if not 1 <= len(body) <= NOTE_MAX:
            raise ValidationError(f"note 正文要 1–{NOTE_MAX} 字（当前 {len(body)}）。", code="BAD_BODY")
    elif kind in ("photo", "link"):
        if len(body) > CAPTIONED_MAX:
            raise ValidationError(
                f"{kind} 的说明最多 {CAPTIONED_MAX} 字（当前 {len(body)}）。", code="BAD_BODY"
            )
    else:
        raise ValidationError(f"未知 kind：{kind}", code="BAD_KIND")

    if kind == "photo" and not draft.media:
        raise ValidationError("photo 至少要 1 张图。", code="NO_MEDIA")
    if kind == "link" and not (draft.link and draft.link.url):
        raise ValidationError("link 缺少 link.url。", code="NO_LINK")
    if len(draft.media) > MAX_MEDIA:
        raise ValidationError(f"一篇最多 {MAX_MEDIA} 张图（当前 {len(draft.media)}）。", code="TOO_MANY_MEDIA")
    for item in draft.media:
        if not (item.alt or "").strip():
            raise ValidationError(f"图片缺 alt：{item.path}", code="NO_ALT")
        if item.caption and len(item.caption) > MAX_CAPTION:
            raise ValidationError(f"图注超过 {MAX_CAPTION} 字：{item.path}", code="BAD_CAPTION")
    if draft.media:
        ensure_post_budget(list(draft.media))

    if draft.link:
        url = draft.link.url
        if not isinstance(url, str) or not url.startswith("https://"):
            raise ValidationError("link.url 只允许 https。", code="BAD_LINK")
        if len(url) > MAX_LINK:
            raise ValidationError(f"link.url 超过 {MAX_LINK} 字符。", code="BAD_LINK")

    visibility = draft.visibility if draft.visibility in VISIBILITIES else "public"
    if owner is False and draft.pinned:
        # 静默忽略，不报错（03 §4.3）。
        pinned = False
    else:
        pinned = bool(draft.pinned)

    when: datetime | None = None
    if draft.date:
        when = _parse_date(draft.date)
        if when and not owner and abs((when - now).total_seconds()) > 24 * 3600:
            raise ValidationError("date 与服务器时间差超过 24 小时。", code="BAD_DATE")

    if re.search(r"(?i)(javascript:|data:text/html)", body):
        raise ValidationError("正文不允许 javascript:/data: 链接。", code="BAD_LINK")
    if re.search(r"(?i)<\s*(script|iframe|object|embed|style)\b", body):
        raise ValidationError("正文不允许 <script>/<iframe> 等原始 HTML。", code="BAD_HTML")
    if len(_external_links(body)) > MAX_EXTERNAL_LINKS:
        raise ValidationError(f"正文外链最多 {MAX_EXTERNAL_LINKS} 个。", code="TOO_MANY_LINKS")

    return replace(
        draft,
        persona=persona,
        title=title,
        body=body,
        kind=kind,
        visibility=visibility,
        pinned=pinned,
        lang=(draft.lang or "zh-CN").strip() or "zh-CN",
        date=when if when is not None else draft.date,
    )


def find_duplicate(drafts: list[PostDraft], target: PostDraft) -> PostDraft | None:
    """简单的正文哈希去重；时间窗口由调用方筛选。"""
    digest = body_sha256(target.body)
    for item in drafts:
        if item.id == target.id:
            continue
        if body_sha256(item.body) == digest:
            return item
    return None


def within_dedupe_window(post_date: datetime, now: datetime, body_len: int) -> bool:
    window = timedelta(days=30) if body_len >= 200 else timedelta(hours=24)
    return abs(now - post_date) <= window
