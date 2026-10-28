"""媒体：类型嗅探、尺寸探测、上限校验（03 §4.3）。"""

from __future__ import annotations

import hashlib
import struct
from dataclasses import dataclass
from pathlib import Path

from .errors import ValidationError

MAX_BYTES = 2 * 1024 * 1024
MAX_PIXELS = 4096
POST_BUDGET = 6 * 1024 * 1024
EXT_BY_MIME = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}


@dataclass(frozen=True)
class MediaFile:
    path: str
    data: bytes
    mime: str
    width: int
    height: int
    sha256: str
    ext: str
    alt: str = ""
    caption: str | None = None

    @property
    def size(self) -> int:
        return len(self.data)


def sniff_mime(data: bytes) -> str | None:
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if data.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if len(data) >= 12 and data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "image/webp"
    return None


def _png_size(data: bytes) -> tuple[int, int]:
    if len(data) < 24 or data[12:16] != b"IHDR":
        raise ValidationError("PNG 头损坏。", code="MEDIA_INVALID")
    width, height = struct.unpack(">II", data[16:24])
    return int(width), int(height)


def _jpeg_size(data: bytes) -> tuple[int, int]:
    i = 2
    while i + 9 < len(data):
        if data[i] != 0xFF:
            i += 1
            continue
        marker = data[i + 1]
        i += 2
        if marker in (0xD8, 0xD9):
            continue
        if i + 2 > len(data):
            break
        length = struct.unpack(">H", data[i : i + 2])[0]
        if marker in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
            if i + 7 > len(data):
                break
            height, width = struct.unpack(">HH", data[i + 3 : i + 7])
            return int(width), int(height)
        i += max(length, 2)
    raise ValidationError("JPEG 尺寸读不出来。", code="MEDIA_INVALID")


def _webp_size(data: bytes) -> tuple[int, int]:
    chunk = data[12:16]
    if chunk == b"VP8X" and len(data) >= 30:
        width = 1 + int.from_bytes(data[24:27], "little")
        height = 1 + int.from_bytes(data[27:30], "little")
        return width, height
    if chunk == b"VP8 " and len(data) >= 30:
        # Lossy: frame header at chunk payload + 6; width/height little-endian 14-bit.
        width, height = struct.unpack("<HH", data[26:30])
        return width & 0x3FFF, height & 0x3FFF
    if chunk == b"VP8L" and len(data) >= 25:
        bits = int.from_bytes(data[21:25], "little")
        width = (bits & 0x3FFF) + 1
        height = ((bits >> 14) & 0x3FFF) + 1
        return width, height
    raise ValidationError("WebP 尺寸读不出来。", code="MEDIA_INVALID")


def probe_size(data: bytes, mime: str) -> tuple[int, int]:
    if mime == "image/png":
        return _png_size(data)
    if mime == "image/jpeg":
        return _jpeg_size(data)
    if mime == "image/webp":
        return _webp_size(data)
    raise ValidationError("只接受 jpg / png / webp（拒绝 SVG）。", code="MEDIA_TYPE")


def load_media(path: str | Path, max_bytes: int = MAX_BYTES) -> MediaFile:
    file = Path(path)
    if not file.is_file():
        raise ValidationError(f"图片不存在：{file}", code="MEDIA_MISSING")
    data = file.read_bytes()
    if len(data) > max_bytes:
        raise ValidationError(
            f"图片超过 {max_bytes // 1024 // 1024} MB：{file.name}", code="MEDIA_TOO_LARGE"
        )
    mime = sniff_mime(data)
    if not mime:
        raise ValidationError(f"不支持的类型（只收 jpg/png/webp）：{file.name}", code="MEDIA_TYPE")
    width, height = probe_size(data, mime)
    if width > MAX_PIXELS or height > MAX_PIXELS:
        raise ValidationError(
            f"图片超过 {MAX_PIXELS}px：{file.name} ({width}×{height})", code="MEDIA_TOO_LARGE"
        )
    return MediaFile(
        path=str(file),
        data=data,
        mime=mime,
        width=width,
        height=height,
        sha256=hashlib.sha256(data).hexdigest(),
        ext=EXT_BY_MIME[mime],
    )


def ensure_post_budget(files: list[MediaFile], budget: int = POST_BUDGET) -> None:
    total = sum(f.size for f in files)
    if total > budget:
        raise ValidationError(
            f"单篇媒体超过 {budget // 1024 // 1024} MB（当前 {total / 1024 / 1024:.1f} MB）",
            code="MEDIA_BUDGET",
        )
