"""极简 ULID（Crockford base32，26 字符）。"""

from __future__ import annotations

import os
import time

ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"


def _encode(value: int, length: int) -> str:
    chars = []
    for _ in range(length):
        chars.append(ALPHABET[value & 31])
        value >>= 5
    return "".join(reversed(chars))


def ulid(now_ms: int | None = None, randomness: bytes | None = None) -> str:
    """Generate a ULID. Monotonicity is not guaranteed across processes."""
    ms = int(time.time() * 1000) if now_ms is None else int(now_ms)
    rand = os.urandom(10) if randomness is None else randomness
    if len(rand) != 10:
        raise ValueError("randomness must be 10 bytes")
    value = 0
    for byte in rand:
        value = (value << 8) | byte
    return _encode(ms, 10) + _encode(value, 16)


def is_ulid(value: str) -> bool:
    return len(value) == 26 and all(ch in ALPHABET for ch in value)
