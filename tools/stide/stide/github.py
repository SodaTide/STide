"""GitHub API（Contents 读 + Git Data 单 commit 写，stdlib urllib）。"""

from __future__ import annotations

import base64
import json
import random
import time
import urllib.error
import urllib.request

from .errors import AuthError, ConflictError, NetworkError, RateLimitError, StideError, ValidationError

API_VERSION = "2022-11-28"
USER_AGENT = "stide/1.0"


class GitHubError(StideError):
    code = "GITHUB"

    def __init__(self, status: int, message: str):
        super().__init__(message, code=f"HTTP_{status}")
        self.status = status


class GitHub:
    def __init__(
        self,
        token: str,
        repo: str,
        branch: str = "main",
        *,
        api_base: str = "https://api.github.com",
        timeout: float = 15.0,
        retries: int = 3,
        user_agent: str = USER_AGENT,
    ):
        self.token = token
        self.repo = repo
        self.branch = branch
        self.api_base = api_base.rstrip("/")
        self.timeout = timeout
        self.retries = retries
        self.user_agent = user_agent

    # -- low level -------------------------------------------------------
    def _request(
        self,
        method: str,
        path: str,
        body: dict | list | None = None,
        *,
        accept: str = "application/vnd.github+json",
    ) -> tuple[int, dict, str]:
        url = f"{self.api_base}{path}"
        data = None if body is None else json.dumps(body).encode("utf-8")
        headers = {
            "Accept": accept,
            "X-GitHub-Api-Version": API_VERSION,
            "User-Agent": self.user_agent,
            "Authorization": f"Bearer {self.token}",
        }
        if data is not None:
            headers["Content-Type"] = "application/json"
        last_exc: Exception | None = None
        for attempt in range(self.retries):
            req = urllib.request.Request(url, data=data, headers=headers, method=method)
            try:
                with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                    raw = resp.read().decode("utf-8", "replace")
                    return resp.status, dict(resp.headers), raw
            except urllib.error.HTTPError as exc:
                raw = exc.read().decode("utf-8", "replace")
                status = exc.code
                headers_out = dict(exc.headers or {})
                if status == 401:
                    raise AuthError("GitHub 拒绝认证（401），检查 token。", code="AUTH") from exc
                if status == 403:
                    if headers_out.get("x-ratelimit-remaining") == "0":
                        reset = headers_out.get("x-ratelimit-reset")
                        raise RateLimitError("GitHub 限额用完了。", retry_after=reset) from exc
                    raise AuthError(f"GitHub 403：{raw[:200]}", code="FORBIDDEN") from exc
                if status == 404:
                    raise GitHubError(404, raw[:300])
                if status in (409, 422):
                    raise ConflictError(f"GitHub 冲突（{status}）：{raw[:200]}") from exc
                if status in (429, 500, 502, 503, 504) and attempt < self.retries - 1:
                    retry_after = headers_out.get("retry-after")
                    delay = float(retry_after) if retry_after else (0.3 * (2**attempt) + random.random() * 0.1)
                    time.sleep(min(delay, 10))
                    continue
                raise StideError(f"GitHub {status}：{raw[:300]}", code=f"HTTP_{status}") from exc
            except (urllib.error.URLError, TimeoutError, OSError) as exc:
                last_exc = exc
                if attempt < self.retries - 1:
                    time.sleep(0.3 * (2**attempt))
                    continue
        raise NetworkError(f"网络失败（{self.retries} 次）：{last_exc}", code="NETWORK")

    def _json(self, raw: str):
        try:
            return json.loads(raw) if raw else None
        except ValueError as exc:
            raise NetworkError("GitHub 返回了非 JSON。", code="BAD_RESPONSE") from exc

    # -- reads -----------------------------------------------------------
    def get_repo(self) -> dict:
        _, _, raw = self._request("GET", f"/repos/{self.repo}")
        return self._json(raw)

    def get_ref(self) -> str:
        _, _, raw = self._request("GET", f"/repos/{self.repo}/git/ref/heads/{self.branch}")
        data = self._json(raw)
        return data["object"]["sha"]

    def get_file(self, path: str, ref: str | None = None) -> tuple[str, str] | None:
        ref = ref or self.branch
        try:
            status, _, raw = self._request("GET", f"/repos/{self.repo}/contents/{path}?ref={ref}")
        except GitHubError as exc:
            if exc.status == 404:
                return None
            raise
        data = self._json(raw)
        if isinstance(data, list):
            raise ValidationError(f"路径是目录，不是文件：{path}", code="BAD_PATH")
        content = base64.b64decode(data.get("content") or "").decode("utf-8", "replace")
        return content, data.get("sha", "")

    def list_dir(self, path: str = "", ref: str | None = None) -> list[dict]:
        ref = ref or self.branch
        clean = path.strip("/")
        target = f"{clean}?ref={ref}" if clean else f"?ref={ref}"
        try:
            _, _, raw = self._request("GET", f"/repos/{self.repo}/contents/{target}")
        except GitHubError as exc:
            if exc.status == 404:
                return []
            raise
        data = self._json(raw)
        return data if isinstance(data, list) else [data]

    def get_tree(self) -> list[dict]:
        """递归列出分支上的 blob；用 Git Trees API，避免逐目录请求。"""
        _, _, raw = self._request("GET", f"/repos/{self.repo}/git/trees/{self.branch}?recursive=1")
        data = self._json(raw)
        return [item for item in data.get("tree", []) if item.get("type") == "blob"]

    # -- writes ----------------------------------------------------------
    def create_commit(
        self,
        files: list[tuple[str, bytes | None]],
        message: str,
        *,
        author: dict | None = None,
    ) -> str:
        """files: [(path, bytes)]；bytes=None 表示删除。返回 commit sha。"""
        if not files:
            raise ValidationError("没有要提交的文件。", code="EMPTY_COMMIT")
        author = author or {"name": "STide Bot", "email": "bot@stide.local"}
        blobs: list[tuple[str, str | None]] = []
        for path, data in files:
            if data is None:
                blobs.append((path, None))
                continue
            if len(data) > 200 * 1024 and path.endswith(".md"):
                raise ValidationError(f"文章超过 200 KB：{path}", code="FILE_TOO_LARGE")
            _, _, raw = self._request(
                "POST",
                f"/repos/{self.repo}/git/blobs",
                {"content": base64.b64encode(data).decode("ascii"), "encoding": "base64"},
            )
            blobs.append((path, self._json(raw)["sha"]))

        for attempt in range(3):
            head = self.get_ref()
            entries = [
                {"path": path, "mode": "100644", "type": "blob", "sha": sha}
                for path, sha in blobs
            ]
            _, _, raw = self._request(
                "POST",
                f"/repos/{self.repo}/git/trees",
                {"base_tree": head, "tree": entries},
            )
            tree_sha = self._json(raw)["sha"]
            _, _, raw = self._request(
                "POST",
                f"/repos/{self.repo}/git/commits",
                {"message": message, "tree": tree_sha, "parents": [head], "author": author, "committer": author},
            )
            commit_sha = self._json(raw)["sha"]
            try:
                self._request(
                    "PATCH",
                    f"/repos/{self.repo}/git/refs/heads/{self.branch}",
                    {"sha": commit_sha, "force": False},
                )
                return commit_sha
            except ConflictError:
                if attempt == 2:
                    raise
                time.sleep(0.2 + random.random() * 0.2)
        raise ConflictError("ref 连续冲突，放弃。", code="CONFLICT")

    def update_file(self, path: str, data: bytes, message: str) -> str:
        return self.create_commit([(path, data)], message)
