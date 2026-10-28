"""配置：环境变量优先，其次 ~/.config/stide/config.json。"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass
from pathlib import Path

from .errors import ValidationError


@dataclass(frozen=True)
class Config:
    token: str | None
    repo: str | None
    branch: str = "main"
    instance: str = "astrbot-main"
    salt: str | None = None
    content_dir: Path = Path("content")
    site_url: str = ""
    api_base: str = "https://api.github.com"

    @classmethod
    def load(
        cls,
        env: dict[str, str] | None = None,
        config_path: Path | None = None,
        cwd: Path | None = None,
    ) -> "Config":
        env = dict(os.environ if env is None else env)
        cwd = Path.cwd() if cwd is None else Path(cwd)
        path = config_path or Path.home() / ".config" / "stide" / "config.json"
        file_config: dict = {}
        if path.exists():
            try:
                file_config = json.loads(path.read_text("utf-8"))
            except (OSError, ValueError) as exc:
                raise ValidationError(f"配置文件读不了：{path}（{exc}）", code="CONFIG") from exc

        def pick(env_key: str, file_key: str, default=None):
            if env.get(env_key):
                return env[env_key]
            if file_config.get(file_key) is not None:
                return file_config[file_key]
            return default

        content_dir = Path(
            pick("STIDE_CONTENT_DIR", "content_dir", str(cwd / "content"))
        ).expanduser()
        if not content_dir.is_absolute():
            content_dir = (cwd / content_dir).resolve()

        return cls(
            token=pick("STIDE_GITHUB_TOKEN", "token"),
            repo=pick("STIDE_REPO", "repo"),
            branch=pick("STIDE_BRANCH", "branch", "main"),
            instance=pick("STIDE_INSTANCE", "instance", "astrbot-main"),
            salt=pick("STIDE_SALT", "salt"),
            content_dir=content_dir,
            site_url=str(pick("STIDE_SITE_URL", "site_url", "")).rstrip("/"),
            api_base=str(pick("STIDE_API_BASE", "api_base", "https://api.github.com")).rstrip("/"),
        )

    def require_github(self) -> tuple[str, str]:
        if not self.token:
            raise ValidationError(
                "缺少 STIDE_GITHUB_TOKEN。设置环境变量，或写 ~/.config/stide/config.json。",
                code="NO_TOKEN",
            )
        if not self.repo or "/" not in self.repo:
            raise ValidationError(
                "STIDE_REPO 必须是 owner/name。",
                code="NO_REPO",
            )
        return self.token, self.repo

    def site_base(self) -> str:
        return (self.site_url or "https://stide.pages.dev").rstrip("/")
