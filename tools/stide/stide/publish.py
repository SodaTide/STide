"""发布编排：单 commit、幂等、媒体去重（03 §6–§9）。"""

from __future__ import annotations

import hashlib
import re
from dataclasses import replace
from datetime import datetime, timedelta, timezone
from pathlib import Path

from .config import Config
from .errors import ValidationError
from .frontmatter import parse, render
from .github import GitHub, GitHubError
from .media import MediaFile
from .people import load_people
from .schema import (
    PostDraft,
    body_sha256,
    find_duplicate,
    validate,
    within_dedupe_window,
)
from .ulid import ulid


def _now_local() -> datetime:
    return datetime.now().astimezone()


def _iso_z(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")


def _excerpt(body: str, limit: int = 80) -> str:
    text = re.sub(r"\s+", " ", body).strip()
    return text[:limit]


def _slug(text: str | None) -> str:
    base = re.sub(r"[^a-z0-9]+", "-", (text or "").lower()).strip("-")
    return base[:48] or "note"


def commit_message(post: PostDraft) -> str:
    subject = post.title or _excerpt(post.body, 40)
    lines = [f"post({post.persona}): {subject}", ""]
    lines += [
        f"Stide-Post-Id: {post.id}",
        f"Stide-Persona: {post.persona}",
        f"Stide-Variant: {post.variant}",
        f"Stide-Instance: {post.source.get('instance', '')}",
        f"Stide-Model: {post.generated.get('model', '')}",
        f"Stide-Body-SHA256: {body_sha256(post.body)[:16]}",
    ]
    return "\n".join(lines)


class Publisher:
    def __init__(
        self,
        config: Config,
        *,
        github: GitHub | None = None,
        people: dict[str, dict] | None = None,
    ):
        self.config = config
        self.github = github
        self._people = people

    # -- infrastructure --------------------------------------------------
    def _client(self) -> GitHub:
        if self.github is not None:
            return self.github
        token, repo = self.config.require_github()
        self.github = GitHub(
            token,
            repo,
            self.config.branch,
            api_base=self.config.api_base,
        )
        return self.github

    def people(self) -> dict[str, dict]:
        if self._people is not None:
            return self._people
        local = load_people(self.config.content_dir)
        if local:
            self._people = local
            return local
        gh = self._client()
        people: dict[str, dict] = {}
        for item in gh.list_dir("content/people"):
            if item.get("type") != "file" or not item["name"].endswith(".json"):
                continue
            data = gh.get_file(item["path"])
            if not data:
                continue
            import json

            person = json.loads(data[0])
            people[person["id"]] = person
        self._people = people
        return people

    def _posts(self, limit: int = 200) -> list[tuple[str, PostDraft]]:
        gh = self._client()
        out: list[tuple[str, PostDraft]] = []
        for item in gh.get_tree():
            path = item["path"]
            if not path.startswith("content/posts/") or not path.endswith(".md"):
                continue
            data = gh.get_file(path)
            if not data:
                continue
            try:
                draft, _ = parse(data[0])
            except ValidationError:
                continue
            out.append((path, draft))
            if len(out) >= limit:
                break
        out.sort(key=lambda pair: str(pair[1].date), reverse=True)
        return out

    # -- public ----------------------------------------------------------
    def publish(
        self,
        draft: PostDraft,
        *,
        now: datetime | None = None,
        dry_run: bool = False,
        owner: bool = False,
        model: str | None = None,
    ) -> dict:
        now = (now or _now_local()).replace(microsecond=0)
        people = self.people()
        post = validate(draft, people=people, now=now, owner=owner)
        post = replace(
            post,
            id=post.id or ulid(),
            date=post.date or now,
            source={
                **post.source,
                "instance": post.source.get("instance") or self.config.instance,
            },
            generated={
                **post.generated,
                "model": model or post.generated.get("model") or "unknown",
                "at": post.generated.get("at") or _iso_z(datetime.now(timezone.utc)),
            },
        )
        day = post.date
        assert isinstance(day, datetime)
        slug = f"{day:%Y%m%d}-{post.id[-4:].lower()}"
        path = f"content/posts/{day:%Y}/{day:%m}/{slug}.md"

        media_files: list[tuple[str, bytes]] = []
        media_entries: list[MediaFile] = []
        for index, item in enumerate(post.media):
            if not item.data:
                # 编辑/本地已存在的条目只保留引用。
                media_entries.append(item)
                continue
            digest = item.sha256 or hashlib.sha256(item.data).hexdigest()
            media_path = f"content/media/{day:%Y}/{day:%m}/{digest[:10]}{item.ext}"
            media_files.append((media_path, item.data))
            media_entries.append(
                replace(
                    item,
                    path=media_path.removeprefix("content/"),
                    sha256=digest,
                    alt=item.alt or f"图 {index + 1}",
                )
            )
        post = replace(post, media=tuple(media_entries))

        if not dry_run:
            gh = self._client()
            recent = self._posts(limit=80)
            for existing_path, existing in recent:
                if find_duplicate([existing], post):
                    return {
                        "ok": True,
                        "duplicate": True,
                        "id": existing.id,
                        "url": f"{self.config.site_base()}/p/{Path(existing_path).stem}/",
                        "message": "正文与最近一篇完全相同，未重复提交。",
                    }

        text = render(post)
        files = media_files + [(path, text.encode("utf-8"))]
        plan = {
            "ok": True,
            "id": post.id,
            "path": path,
            "kind": post.kind,
            "date": post.date.isoformat(),
            "url": f"{self.config.site_base()}/p/{slug}/",
            "files": [p for p, _ in files],
            "bytes": sum(len(data) for _, data in files),
            "commit": commit_message(post),
        }
        if dry_run:
            plan["dry_run"] = True
            return plan
        gh = self._client()
        commit_sha = gh.create_commit(files, commit_message(post))
        plan["commit_sha"] = commit_sha
        return plan

    def list_posts(self, persona: str | None = None, limit: int = 10) -> list[dict]:
        rows = []
        for path, draft in self._posts():
            if persona and draft.persona != persona:
                continue
            rows.append(
                {
                    "id": draft.id,
                    "persona": draft.persona,
                    "kind": draft.kind,
                    "title": draft.title or _excerpt(draft.body, 60),
                    "date": str(draft.date),
                    "visibility": draft.visibility,
                    "path": path,
                    "url": f"{self.config.site_base()}/p/{Path(path).stem}/",
                }
            )
            if len(rows) >= limit:
                break
        return rows

    def find(self, post_id: str) -> tuple[str, PostDraft]:
        for path, draft in self._posts():
            if draft.id == post_id:
                return path, draft
        raise ValidationError(f"找不到 id={post_id}", code="NOT_FOUND")

    def edit(
        self,
        post_id: str,
        *,
        title: str | None = None,
        body: str | None = None,
        dry_run: bool = False,
    ) -> dict:
        path, draft = self.find(post_id)
        changed = replace(
            draft,
            title=title if title is not None else draft.title,
            body=body if body is not None else draft.body,
        )
        changed = validate(changed, people=self.people(), now=_now_local(), owner=True)
        text = render(changed)
        plan = {
            "ok": True,
            "id": changed.id,
            "path": path,
            "url": f"{self.config.site_base()}/p/{Path(path).stem}/",
            "commit": f"edit({changed.persona}): {changed.title or _excerpt(changed.body, 40)}",
        }
        if dry_run:
            plan["dry_run"] = True
            return plan
        plan["commit_sha"] = self._client().create_commit(
            [(path, text.encode("utf-8"))], plan["commit"]
        )
        return plan

    def hide(self, post_id: str, *, dry_run: bool = False) -> dict:
        path, draft = self.find(post_id)
        changed = replace(draft, visibility="hidden")
        text = render(changed)
        plan = {
            "ok": True,
            "id": changed.id,
            "path": path,
            "commit": f"hide({changed.persona}): {changed.title or _excerpt(changed.body, 40)}",
        }
        if dry_run:
            plan["dry_run"] = True
            return plan
        plan["commit_sha"] = self._client().create_commit([(path, text.encode("utf-8"))], plan["commit"])
        return plan

    def preview(self, draft: PostDraft, out_dir: Path | None = None) -> dict:
        post = validate(draft, people=self.people(), now=_now_local(), owner=True)
        post = replace(post, id=post.id or ulid(), date=post.date or _now_local().replace(microsecond=0))
        out = out_dir or (self.config.content_dir / "drafts")
        out.mkdir(parents=True, exist_ok=True)
        path = out / f"{_slug(post.title or post.body)}.md"
        path.write_text(render(post), "utf-8")
        return {"ok": True, "path": str(path), "kind": post.kind, "url": path.as_uri()}
