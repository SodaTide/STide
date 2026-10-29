"""人格注册表：校验、渲染与 owner-only 注册（03 §4.2 / §5.1）。"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, replace
from datetime import date
from pathlib import Path

from .errors import ValidationError

ID_RE = re.compile(r"^[a-z][a-z0-9_]{0,63}$")
MAX_NAME = 40
MAX_SIGNATURE = 80
MAX_BIO = 160
STATUSES = ("active", "retired")


@dataclass(frozen=True)
class PersonaSpec:
    id: str
    name: str
    hue: int
    signature: str = ""
    bio: str = ""
    lang: str = "zh-CN"
    avatar: str | None = None
    status: str = "active"
    first_seen: str | None = None


def _today() -> str:
    return date.today().isoformat()


def normalize(spec: PersonaSpec) -> PersonaSpec:
    pid = (spec.id or "").strip()
    if not ID_RE.match(pid):
        raise ValidationError(
            f"人格 id 只能是小写字母/数字/下划线，且以字母或数字开头：{spec.id!r}",
            code="BAD_PERSONA_ID",
        )
    name = (spec.name or "").strip()
    if not name:
        raise ValidationError("人格 name 不能为空。", code="BAD_PERSONA_NAME")
    if len(name) > MAX_NAME:
        raise ValidationError(f"name 超过 {MAX_NAME} 字（{len(name)}）。", code="BAD_PERSONA_NAME")
    if not isinstance(spec.hue, int) or not 0 <= spec.hue <= 360:
        raise ValidationError("hue 必须是 0–360 的整数。", code="BAD_HUE")
    if spec.status not in STATUSES:
        raise ValidationError(f"status 只能是 {STATUSES}。", code="BAD_STATUS")
    signature = (spec.signature or "").strip()
    if not signature:
        raise ValidationError("signature 不能为空（站点 schema 需要它作签名）。", code="BAD_SIGNATURE")
    if len(signature) > MAX_SIGNATURE:
        raise ValidationError(f"signature 超过 {MAX_SIGNATURE} 字。", code="BAD_SIGNATURE")
    bio = (spec.bio or "").strip()
    if not bio:
        raise ValidationError("bio 不能为空（站点 schema 需要它作简介）。", code="BAD_BIO")
    if len(bio) > MAX_BIO:
        raise ValidationError(
            f"bio 超过 {MAX_BIO} 字；请先删减（构建也会截断，但注册时应显式处理）。",
            code="BAD_BIO",
        )
    if spec.avatar:
        avatar = spec.avatar.strip()
        if avatar.startswith(("http://", "https://", "//")):
            raise ValidationError("avatar 只接受仓库内相对路径，不接受外链。", code="BAD_AVATAR")
        if avatar.startswith("/") or ".." in Path(avatar).parts:
            raise ValidationError("avatar 必须是 content/ 下的相对路径（如 people/x/avatar.webp）。", code="BAD_AVATAR")
    first_seen = (spec.first_seen or _today()).strip()
    try:
        date.fromisoformat(first_seen)
    except ValueError as exc:
        raise ValidationError(f"first_seen 不是 YYYY-MM-DD：{first_seen}", code="BAD_FIRST_SEEN") from exc
    return replace(
        spec,
        id=pid,
        name=name,
        signature=signature,
        bio=bio,
        lang=(spec.lang or "zh-CN").strip() or "zh-CN",
        avatar=(spec.avatar.strip() if spec.avatar else None),
        first_seen=first_seen,
    )


def validate_new(spec: PersonaSpec, existing: dict[str, dict]) -> tuple[PersonaSpec, list[str]]:
    spec = normalize(spec)
    if spec.id in existing:
        raise ValidationError(
            f"人格已注册：{spec.id}（{existing[spec.id].get('name', '')}）", code="PERSONA_EXISTS"
        )
    warnings: list[str] = []
    for other in existing.values():
        other_hue = other.get("hue")
        if isinstance(other_hue, int) and abs(other_hue - spec.hue) < 12:
            warnings.append(
                f"{spec.id}({spec.hue}) 与 {other.get('id')}({other_hue}) 的色相差只有 "
                f"{abs(other_hue - spec.hue)}°，建议拉开 ≥12°"
            )
    return spec, warnings


def render(spec: PersonaSpec) -> str:
    payload = {
        "id": spec.id,
        "name": spec.name,
        "lang": spec.lang,
        "hue": spec.hue,
        "signature": spec.signature,
        "bio": spec.bio,
        "first_seen": spec.first_seen,
        "status": spec.status,
    }
    if spec.avatar:
        payload["avatar"] = spec.avatar
    return json.dumps(payload, ensure_ascii=False, indent=2) + "\n"


def write_local(content_dir: str | Path, spec: PersonaSpec) -> Path:
    root = Path(content_dir) / "people"
    root.mkdir(parents=True, exist_ok=True)
    path = root / f"{spec.id}.json"
    if path.exists():
        raise ValidationError(f"人格文件已存在：{path}", code="PERSONA_EXISTS")
    path.write_text(render(spec), "utf-8")
    return path


def summarize(people: dict[str, dict]) -> list[dict]:
    rows = []
    for pid in sorted(people):
        person = people[pid]
        rows.append(
            {
                "id": pid,
                "name": person.get("name", ""),
                "hue": person.get("hue"),
                "status": person.get("status", "active"),
                "lang": person.get("lang", ""),
            }
        )
    return rows
