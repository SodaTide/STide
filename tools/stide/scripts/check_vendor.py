"""CI：校验插件里的 vendor 副本与 tools/stide/stide 一致。"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from sync_vendor import DST, HASH_FILE, vendor_hash  # noqa: E402


def main() -> int:
    if not HASH_FILE.exists():
        print("缺少 VENDOR_SHA256；先跑 sync_vendor.py", file=sys.stderr)
        return 1
    expected = HASH_FILE.read_text("utf-8").strip()
    actual = vendor_hash()
    if expected != actual:
        print(f"vendor 不一致：{expected[:12]}… != {actual[:12]}…；重跑 sync_vendor.py", file=sys.stderr)
        return 1
    print("vendor ok")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
