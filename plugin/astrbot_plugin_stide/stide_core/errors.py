"""错误类型与退出码（03 §7.2）。"""

from __future__ import annotations


class StideError(Exception):
    code = "ERROR"
    exit_code = 2

    def __init__(self, message: str, *, code: str | None = None, details: dict | None = None):
        super().__init__(message)
        self.message = message
        if code:
            self.code = code
        self.details = details or {}

    def to_dict(self) -> dict:
        out = {"ok": False, "code": self.code, "message": self.message}
        out.update(self.details)
        return out


class ValidationError(StideError):
    code = "VALIDATION"
    exit_code = 2


class AuthError(StideError):
    code = "AUTH"
    exit_code = 3


class ConflictError(StideError):
    code = "CONFLICT"
    exit_code = 4


class RateLimitError(StideError):
    code = "RATE_LIMITED"
    exit_code = 5

    def __init__(self, message: str, retry_after: int | str | None = None):
        super().__init__(message, details={"retry_after": retry_after} if retry_after else {})


class NetworkError(StideError):
    code = "NETWORK"
    exit_code = 6
