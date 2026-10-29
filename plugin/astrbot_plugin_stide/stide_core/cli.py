"""argparse 入口；stdout 只有结果，日志走 stderr（03 §7.2）。"""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import replace
from datetime import datetime, timezone
from pathlib import Path

from . import __version__
from .config import Config
from .doctor import doctor
from .errors import StideError
from .frontmatter import parse, render
from .media import MediaFile, load_media
from .persona import PersonaSpec
from .publish import Publisher
from .schema import Link, PostDraft, infer_kind


def _draft_from_file(path: Path) -> PostDraft:
    text = path.read_text("utf-8")
    if text.lstrip().startswith("---"):
        draft, _ = parse(text)
        return draft
    return PostDraft(persona="", body=text.strip())


def _collect_media(args, base: PostDraft, content_dir: Path) -> tuple[MediaFile, ...]:
    if args.media:
        files = []
        alts = list(args.alt or [])
        captions = list(args.caption or [])
        for index, raw in enumerate(args.media):
            item = load_media(raw)
            alt = alts[index] if index < len(alts) else ""
            caption = captions[index] if index < len(captions) else None
            if not alt and index < len(base.media):
                alt = base.media[index].alt
                caption = caption or base.media[index].caption
            files.append(replace(item, alt=alt, caption=caption))
        return tuple(files)
    if base.media:
        resolved = []
        for item in base.media:
            local = Path(item.path)
            if not local.is_absolute():
                local = content_dir / local
            if local.exists():
                loaded = load_media(local)
                resolved.append(replace(loaded, alt=item.alt or loaded.alt, caption=item.caption))
            else:
                resolved.append(item)
        return tuple(resolved)
    return ()


def _make_publisher(args) -> Publisher:
    config = Config.load()
    return Publisher(config)


def _print(result: dict, args) -> None:
    if getattr(args, "json", False):
        print(json.dumps(result, ensure_ascii=False, separators=(",", ":")))
        return
    if result.get("ok"):
        for key in ("url", "id", "path", "kind", "commit_sha", "message"):
            if result.get(key):
                print(f"{key}: {result[key]}")
        for warning in result.get("warnings") or []:
            print(f"warning: {warning}", file=sys.stderr)
    else:
        print(f"{result.get('code', 'ERROR')}: {result.get('message', '')}", file=sys.stderr)


def cmd_init(args) -> int:
    root = Path.cwd() / "content"
    for sub in ("people", "posts", "media"):
        (root / sub).mkdir(parents=True, exist_ok=True)
    style = root / "STYLE.md"
    if not style.exists():
        style.write_text("# 写作风格\n\n- 第一人称、具体，不写客服话术。\n", "utf-8")
    _print({"ok": True, "path": str(root)}, args)
    return 0


def cmd_publish(args) -> int:
    base = _draft_from_file(Path(args.file)) if args.file else PostDraft(persona="", body=args.body or "")
    config = Config.load()
    draft = replace(
        base,
        persona=args.as_persona or base.persona,
        body=args.body if args.body is not None else base.body,
        title=args.title if args.title is not None else base.title,
        kind=args.kind or base.kind,
        lang=args.lang or base.lang,
        visibility=args.visibility or base.visibility,
        summary=args.summary or base.summary,
        media=_collect_media(args, base, config.content_dir),
    )
    if args.link:
        draft = replace(draft, link=Link(url=args.link, title=args.link_title, site=args.link_site))
    pub = _make_publisher(args)
    result = pub.publish(
        draft,
        now=datetime.now().astimezone(),
        dry_run=args.dry_run,
        owner=args.owner,
        model=args.model,
    )
    _print(result, args)
    return 0


def cmd_list(args) -> int:
    result = {"ok": True, "posts": _make_publisher(args).list_posts(args.as_persona, args.limit)}
    _print(result, args)
    return 0


def cmd_persona_add(args) -> int:
    config = Config.load()
    spec = PersonaSpec(
        id=args.id,
        name=args.name,
        hue=args.hue,
        signature=args.signature or "",
        bio=args.bio or "",
        lang=args.lang,
        avatar=args.avatar,
        status=args.status,
        first_seen=args.first_seen,
    )
    result = Publisher(config).register_persona(spec, dry_run=args.dry_run, local=args.local)
    _print(result, args)
    return 0


def cmd_persona_list(args) -> int:
    rows = _make_publisher(args).list_people()
    result = {"ok": True, "people": rows}
    if args.json:
        print(json.dumps(result, ensure_ascii=False, separators=(",", ":")))
    else:
        for row in rows:
            print(f"{row['id']:20} {row['hue']:>4}  {row['status']:7} {row['name']}")
    return 0


def cmd_edit(args) -> int:
    body = args.body
    title = args.title
    if args.file:
        draft = _draft_from_file(Path(args.file))
        body = body if body is not None else draft.body
        title = title if title is not None else draft.title
    pub = _make_publisher(args)
    result = pub.edit(args.id, title=title, body=body, dry_run=args.dry_run)
    _print(result, args)
    return 0


def cmd_hide(args) -> int:
    result = _make_publisher(args).hide(args.id, dry_run=args.dry_run)
    _print(result, args)
    return 0


def cmd_preview(args) -> int:
    base = _draft_from_file(Path(args.file)) if args.file else PostDraft(persona="", body=args.body or "")
    config = Config.load()
    draft = replace(
        base,
        persona=args.as_persona or base.persona,
        body=args.body if args.body is not None else base.body,
        title=args.title if args.title is not None else base.title,
        kind=args.kind or base.kind,
        lang=args.lang or base.lang,
        media=_collect_media(args, base, config.content_dir),
    )
    result = _make_publisher(args).preview(draft)
    _print(result, args)
    return 0


def cmd_doctor(args) -> int:
    config = Config.load()
    result, code = doctor(config, offline=args.offline)
    if args.json:
        print(json.dumps(result, ensure_ascii=False, separators=(",", ":")))
    else:
        for item in result["checks"]:
            if not item["ok"] or item["level"] in ("info", "error"):
                print(f"[{item['level']}] {item['name']}: {item['detail']}", file=sys.stderr)
        print(result["ok"] and "doctor: ok" or "doctor: failed")
    return code


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="stide", description="STide 发布器")
    parser.add_argument("--version", action="version", version=f"%(prog)s {__version__}")
    sub = parser.add_subparsers(dest="command", required=True)

    def add_common(p):
        p.add_argument("--json", action="store_true", help="输出一行 JSON")

    p_init = sub.add_parser("init", help="初始化 content/ 目录")
    add_common(p_init)
    p_init.set_defaults(func=cmd_init)

    p_persona = sub.add_parser("persona", help="人格注册表（owner-only）")
    persona_sub = p_persona.add_subparsers(dest="persona_command", required=True)

    p_persona_add = persona_sub.add_parser("add", help="注册一个新的人格")
    add_common(p_persona_add)
    p_persona_add.add_argument("--id", required=True, help="小写字母/数字/下划线，如 new_persona")
    p_persona_add.add_argument("--name", required=True)
    p_persona_add.add_argument("--hue", required=True, type=int, help="0–360；与现有人格差 ≥12°")
    p_persona_add.add_argument("--signature", required=True, help="签名，1–80 字")
    p_persona_add.add_argument("--bio", required=True, help="简介，1–160 字")
    p_persona_add.add_argument("--lang", default="zh-CN")
    p_persona_add.add_argument("--avatar", help="仓库内相对路径，如 people/x/avatar.webp")
    p_persona_add.add_argument("--status", choices=["active", "retired"], default="active")
    p_persona_add.add_argument("--first-seen", default=None)
    p_persona_add.add_argument("--local", action="store_true", help="只写工作区，不提交 GitHub")
    p_persona_add.add_argument("--dry-run", action="store_true")
    p_persona_add.set_defaults(func=cmd_persona_add)

    p_persona_list = persona_sub.add_parser("list", help="列出已注册人格")
    add_common(p_persona_list)
    p_persona_list.set_defaults(func=cmd_persona_list)

    p_pub = sub.add_parser("publish", help="发一篇")
    add_common(p_pub)
    p_pub.add_argument("--as", dest="as_persona", required=True, help="人格 id（必须显式传）")
    p_pub.add_argument("--file", help="Markdown 文件（可带 frontmatter）")
    p_pub.add_argument("--body", help="正文；与 --file 二选一")
    p_pub.add_argument("--title")
    p_pub.add_argument("--kind", choices=["note", "story", "photo", "link"])
    p_pub.add_argument("--media", action="append", default=[], help="本地图片，可重复")
    p_pub.add_argument("--alt", action="append", default=[], help="与 --media 对齐的 alt，可重复")
    p_pub.add_argument("--caption", action="append", default=[], help="与 --media 对齐的图注，可重复")
    p_pub.add_argument("--link", help="外链 https://…")
    p_pub.add_argument("--link-title")
    p_pub.add_argument("--link-site")
    p_pub.add_argument("--lang", default="zh-CN")
    p_pub.add_argument("--summary")
    p_pub.add_argument("--visibility", choices=["public", "unlisted", "hidden"], default=None)
    p_pub.add_argument("--model", default="stide-cli")
    p_pub.add_argument("--owner", action="store_true", help="所有者发布（放宽时间/置顶限制）")
    p_pub.add_argument("--dry-run", action="store_true", help="只打印计划，不写 GitHub")
    p_pub.set_defaults(func=cmd_publish)

    p_list = sub.add_parser("list", help="看最近发过什么")
    add_common(p_list)
    p_list.add_argument("--as", dest="as_persona")
    p_list.add_argument("--limit", type=int, default=10)
    p_list.set_defaults(func=cmd_list)

    p_edit = sub.add_parser("edit", help="改一篇")
    add_common(p_edit)
    p_edit.add_argument("id")
    p_edit.add_argument("--file")
    p_edit.add_argument("--body")
    p_edit.add_argument("--title")
    p_edit.add_argument("--dry-run", action="store_true")
    p_edit.set_defaults(func=cmd_edit)

    p_hide = sub.add_parser("hide", help="软删（visibility=hidden）")
    add_common(p_hide)
    p_hide.add_argument("id")
    p_hide.add_argument("--dry-run", action="store_true")
    p_hide.set_defaults(func=cmd_hide)

    p_prev = sub.add_parser("preview", help="写一份本地草稿")
    add_common(p_prev)
    p_prev.add_argument("--as", dest="as_persona", required=True)
    p_prev.add_argument("--file")
    p_prev.add_argument("--body")
    p_prev.add_argument("--title")
    p_prev.add_argument("--kind", choices=["note", "story", "photo", "link"])
    p_prev.add_argument("--media", action="append", default=[])
    p_prev.add_argument("--alt", action="append", default=[])
    p_prev.add_argument("--caption", action="append", default=[])
    p_prev.add_argument("--lang", default="zh-CN")
    p_prev.set_defaults(func=cmd_preview)

    p_doc = sub.add_parser("doctor", help="上线前自检")
    add_common(p_doc)
    p_doc.add_argument("--offline", action="store_true", help="只查本地内容")
    p_doc.set_defaults(func=cmd_doctor)

    p_verify = sub.add_parser("verify", help="= doctor --offline")
    add_common(p_verify)
    p_verify.set_defaults(func=cmd_doctor, offline=True)

    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        return int(args.func(args))
    except StideError as exc:
        result = exc.to_dict()
        if getattr(args, "json", False):
            print(json.dumps(result, ensure_ascii=False, separators=(",", ":")))
        else:
            print(f"{result['code']}: {result['message']}", file=sys.stderr)
        return exc.exit_code
    except KeyboardInterrupt:
        return 130


if __name__ == "__main__":
    raise SystemExit(main())
