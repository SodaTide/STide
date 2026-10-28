"""把 tools/stide/stide 同步到 AstrBot 插件（vendor 副本）。"""

from __future__ import annotations

import hashlib
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "stide"
DST = ROOT.parents[1] / "plugin" / "astrbot_plugin_stide" / "stide_core"
HASH_FILE = DST / "VENDOR_SHA256"


def vendor_hash() -> str:
    digest = hashlib.sha256()
    for file in sorted(SRC.glob("*.py")):
        digest.update(file.name.encode())
        digest.update(b"\0")
        digest.update(file.read_bytes())
    return digest.hexdigest()


def sync() -> str:
    DST.mkdir(parents=True, exist_ok=True)
    for old in DST.glob("*.py"):
        old.unlink()
    for file in sorted(SRC.glob("*.py")):
        shutil.copy2(file, DST / file.name)
    value = vendor_hash()
    HASH_FILE.write_text(value + "\n", "utf-8")
    return value


if __name__ == "__main__":
    print(sync())
