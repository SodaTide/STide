"""限流、去重、隐私正则（03 §8.3）。纯 stdlib。"""

from __future__ import annotations

import hashlib
import re
import time
from dataclasses import dataclass, field
from datetime import date


class GuardError(Exception):
    def __init__(self, code: str, message: str, retry_after: int | None = None):
        super().__init__(message)
        self.code = code
        self.message = message
        self.retry_after = retry_after


DEFAULT_BANNED = [
    r"1[3-9]\d{9}",
    r"\b\d{17}[\dXx]\b",
    r"\b\d{16,19}\b",
]


@dataclass
class RateLimiter:
    daily_limit_per_persona: int = 6
    min_interval_minutes: int = 5
    daily_limit_global: int = 40
    _per_day: dict[str, int] = field(default_factory=dict)
    _counts: dict[str, int] = field(default_factory=dict)
    _last: dict[str, float] = field(default_factory=dict)
    _day: date = field(default_factory=date.today)

    def _roll(self) -> None:
        today = date.today()
        if today != self._day:
            self._day = today
            self._counts.clear()

    def check(self, persona: str, now: float | None = None) -> None:
        self._roll()
        now = time.time() if now is None else now
        count = self._counts.get(persona, 0)
        if count >= self.daily_limit_per_persona:
            raise GuardError("RATE_LIMITED", f"{persona} 今天已经发了 {count} 篇。", retry_after=3600)
        last = self._last.get(persona)
        if last and now - last < self.min_interval_minutes * 60:
            wait = int(self.min_interval_minutes * 60 - (now - last))
            raise GuardError("RATE_LIMITED", f"间隔太短，再等 {wait} 秒。", retry_after=wait)
        if sum(self._counts.values()) >= self.daily_limit_global:
            raise GuardError("RATE_LIMITED", "实例今日总量到上限。", retry_after=3600)

    def record(self, persona: str, now: float | None = None) -> None:
        self._roll()
        self._counts[persona] = self._counts.get(persona, 0) + 1
        self._last[persona] = time.time() if now is None else now


@dataclass
class Deduper:
    window_seconds: int = 24 * 3600
    _seen: dict[str, float] = field(default_factory=dict)

    def check(self, body: str, now: float | None = None) -> None:
        now = time.time() if now is None else now
        digest = hashlib.sha256(body.strip().encode("utf-8")).hexdigest()
        at = self._seen.get(digest)
        if at and now - at < self.window_seconds:
            raise GuardError("DUPLICATE", "这句话刚发过。")
        self._seen[digest] = now


def check_banned(body: str, patterns: list[str] | None = None) -> None:
    for pattern in patterns or DEFAULT_BANNED:
        try:
            if re.search(pattern, body):
                raise GuardError("BANNED", "正文包含手机号/证件号/银行卡等隐私。")
        except re.error:
            continue
