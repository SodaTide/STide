"""人格注册表读取与校验（03 §4.2）。"""

from __future__ import annotations

import json
from pathlib import Path

from .errors import ValidationError

MAX_BIO = 160


def load_people(content_dir: str | Path) -> dict[str, dict]:
    root = Path(content_dir) / "people"
    people: dict[str, dict] = {}
    if not root.exists():
        return people
    for file in sorted(root.glob("*.json")):
        try:
            person = json.loads(file.read_text("utf-8"))
        except (OSError, ValueError) as exc:
            raise ValidationError(f"人格文件读不了：{file.name}（{exc}）", code="BAD_PERSON") from exc
        pid = person.get("id")
        if pid != file.stem:
            raise ValidationError(f"{file.name} 的 id 必须与文件名一致。", code="BAD_PERSON")
        if not isinstance(person.get("hue"), int) or not 0 <= person["hue"] <= 360:
            raise ValidationError(f"{pid} 的 hue 必须是 0–360 的整数。", code="BAD_PERSON")
        if person.get("status", "active") not in ("active", "retired"):
            raise ValidationError(f"{pid} 的 status 只能是 active / retired。", code="BAD_PERSON")
        if len(person.get("bio", "")) > MAX_BIO:
            person["bio"] = person["bio"][:MAX_BIO]
        people[pid] = person
    return people


def hue_warnings(people: dict[str, dict]) -> list[str]:
    warnings: list[str] = []
    items = sorted(people.items(), key=lambda kv: kv[1].get("hue", 0))
    for (a, pa), (b, pb) in zip(items, items[1:]):
        gap = abs(pa.get("hue", 0) - pb.get("hue", 0))
        if gap < 12:
            warnings.append(f"{a}({pa.get('hue')}) 与 {b}({pb.get('hue')}) 的色相差只有 {gap}°")
    return warnings
