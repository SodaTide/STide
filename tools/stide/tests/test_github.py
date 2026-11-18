"""GitHub API 客户端错误处理回归。"""

import http.client
import io
import unittest
import urllib.error
from unittest.mock import patch

from stide.errors import AuthError, RateLimitError
from stide.github import GitHub


def http_error(status: int, body: bytes, headers: dict[str, str]) -> urllib.error.HTTPError:
    h = http.client.HTTPMessage()
    for key, value in headers.items():
        h[key] = value
    return urllib.error.HTTPError("https://api.github.com/repos/a/b", status, "err", h, io.BytesIO(body))


class HeaderCaseTests(unittest.TestCase):
    """HTTP 头大小写不敏感，但 dict(HTTPMessage) 保留原始大小写。"""

    def test_403_rate_limit_detected(self):
        err = http_error(
            403,
            b'{"message":"API rate limit exceeded"}',
            {"X-RateLimit-Limit": "5000", "X-RateLimit-Remaining": "0", "X-RateLimit-Reset": "1700000000"},
        )
        gh = GitHub("tok", "a/b")
        with patch("urllib.request.urlopen", side_effect=err):
            with self.assertRaises(RateLimitError) as ctx:
                gh.get_repo()
        self.assertEqual(ctx.exception.details["retry_after"], "1700000000")

    def test_403_no_rate_limit_header_is_forbidden(self):
        err = http_error(403, b'{"message":"Resource not accessible"}', {})
        gh = GitHub("tok", "a/b")
        with patch("urllib.request.urlopen", side_effect=err):
            with self.assertRaises(AuthError) as ctx:
                gh.get_repo()
        self.assertEqual(ctx.exception.code, "FORBIDDEN")

    def test_429_honors_retry_after(self):
        err = http_error(429, b"{}", {"Retry-After": "7"})
        gh = GitHub("tok", "a/b", retries=2)
        delays: list[float] = []
        with patch("urllib.request.urlopen", side_effect=err), patch(
            "stide.github.time.sleep", side_effect=lambda d: delays.append(d)
        ):
            with self.assertRaises(Exception):
                gh.get_repo()
        self.assertEqual(len(delays), 1)
        self.assertAlmostEqual(delays[0], 7.0)


if __name__ == "__main__":
    unittest.main()
