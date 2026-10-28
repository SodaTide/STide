"""上线前自检（03 §7.2）。"""

from __future__ import annotations

import json
from pathlib import Path

from .config import Config
from .frontmatter import parse
from .github import GitHub, GitHubError
from .media import sniff_mime
from .people import hue_warnings, load_people
from .schema import validate
from .errors import StideError


def _check(name: str, ok: bool, level: str = "info", detail: str = "") -> dict:
    return {"name": name, "ok": ok, "level": level, "detail": detail}


def _local_checks(config: Config) -> tuple[list[dict], dict]:
    checks: list[dict] = []
    root = config.content_dir
    posts_root = root / "posts"
    media_root = root / "media"
    people = {}
    try:
        people = load_people(root)
    except StideError as exc:
        checks.append(_check("people.registry", False, "error", exc.message))
    else:
        checks.append(_check("people.registry", bool(people), "error", f"{len(people)} 个人格"))
        for warning in hue_warnings(people):
            checks.append(_check("people.hue", False, "warn", warning))

    posts = []
    ids: set[str] = set()
    referenced: set[str] = set()
    errors = 0
    for file in sorted(posts_root.rglob("*.md")) if posts_root.exists() else []:
        try:
            raw = file.read_text("utf-8")
            draft, _ = parse(raw)
            validate(draft, people=people, owner=True)
        except StideError as exc:
            errors += 1
            checks.append(_check("post", False, "error", f"{file.relative_to(root)}：{exc.message}"))
            continue
        posts.append((file, draft))
        if draft.id in ids:
            errors += 1
            checks.append(_check("post.id", False, "error", f"id 重复：{draft.id}"))
        ids.add(draft.id or "")
        for item in draft.media:
            src = item.path.removeprefix("/")
            referenced.add(src)
            if src and not (root / src).exists():
                errors += 1
                checks.append(_check("media.missing", False, "error", f"{file.name} 引用了不存在的 {src}"))
            if src and (root / src).exists() and not item.alt:
                errors += 1
                checks.append(_check("media.alt", False, "error", f"{file.name}：{src} 缺 alt"))
    checks.append(_check("posts", errors == 0, "error", f"{len(posts)} 篇，{errors} 个问题"))

    orphans = []
    if media_root.exists():
        for file in media_root.rglob("*"):
            if not file.is_file() or file.name.startswith("."):
                continue
            rel = file.relative_to(root).as_posix()
            if rel not in referenced:
                orphans.append(rel)
            if file.suffix.lower() not in (".jpg", ".jpeg", ".png", ".webp"):
                checks.append(_check("media.type", False, "warn", f"不该入库的类型：{rel}"))
            else:
                head = file.read_bytes()[:16]
                if not sniff_mime(head + b"\0" * 16):
                    checks.append(_check("media.sniff", False, "warn", f"类型嗅探失败：{rel}"))
    checks.append(_check("media.orphans", not orphans, "warn", f"{len(orphans)} 个孤儿文件"))
    return checks, {"people": people, "posts": len(posts), "orphans": len(orphans)}


def _github_checks(config: Config) -> list[dict]:
    checks: list[dict] = []
    try:
        token, repo = config.require_github()
    except StideError as exc:
        checks.append(_check("github.config", False, "error", exc.message))
        return checks
    gh = GitHub(token, repo, config.branch, api_base=config.api_base)
    try:
        info = gh.get_repo()
        checks.append(_check("github.repo", True, "info", f"{info.get('full_name')} ({info.get('visibility', '?')})"))
        head = gh.get_ref()
        checks.append(_check("github.branch", True, "info", f"{config.branch} @ {head[:8]}"))
        people_dir = gh.list_dir("content/people")
        checks.append(_check("github.people", bool(people_dir), "warn", f"{len(people_dir)} 个文件"))
    except StideError as exc:
        checks.append(_check("github.repo", False, "error", exc.message))
    return checks


def doctor(config: Config, *, offline: bool = False, json_output: bool = False) -> tuple[dict, int]:
    local_checks, summary = _local_checks(config)
    checks = list(local_checks)
    if not offline:
        checks += _github_checks(config)
        checks.append(_check("cloudflare", True, "warn", "Pages/DNS 需要上线后用 curl 复核（见 doc/deploy.md）"))
    errors = [c for c in checks if not c["ok"] and c["level"] == "error"]
    warnings = [c for c in checks if not c["ok"] and c["level"] == "warn"]
    result = {
        "ok": not errors,
        "summary": summary,
        "checks": checks,
        "errors": len(errors),
        "warnings": len(warnings),
    }
    return result, 0 if not errors else 2
