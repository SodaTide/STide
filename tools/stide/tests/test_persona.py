import json
import tempfile
import unittest
from pathlib import Path

from stide.config import Config
from stide.errors import ValidationError
from stide.persona import PersonaSpec, normalize, render, validate_new
from stide.publish import Publisher


def spec(**kwargs):
    base = dict(id="new_persona", name="新人格", hue=300, signature="你好", bio="测试")
    base.update(kwargs)
    return PersonaSpec(**base)


class PersonaTests(unittest.TestCase):
    def test_normalize(self):
        value = normalize(spec())
        self.assertEqual(value.id, "new_persona")
        self.assertTrue(value.first_seen)

    def test_bad_id(self):
        with self.assertRaises(ValidationError):
            normalize(spec(id="New Persona"))

    def test_bad_hue(self):
        with self.assertRaises(ValidationError):
            normalize(spec(hue=361))
        with self.assertRaises(ValidationError):
            normalize(spec(hue=-1))

    def test_duplicate(self):
        with self.assertRaises(ValidationError):
            validate_new(spec(), {"new_persona": {"id": "new_persona", "hue": 300}})

    def test_hue_warning(self):
        _, warnings = validate_new(spec(hue=305), {"old": {"id": "old", "hue": 300}})
        self.assertTrue(warnings)

    def test_render_roundtrip(self):
        text = render(normalize(spec(avatar="people/new_persona/avatar.webp")))
        data = json.loads(text)
        self.assertEqual(data["id"], "new_persona")
        self.assertEqual(data["avatar"], "people/new_persona/avatar.webp")
        self.assertEqual(data["status"], "active")

    def test_avatar_rejects_url(self):
        with self.assertRaises(ValidationError):
            normalize(spec(avatar="https://example.com/a.png"))

    def test_signature_and_bio_required(self):
        with self.assertRaises(ValidationError):
            normalize(spec(signature=""))
        with self.assertRaises(ValidationError):
            normalize(spec(bio=""))

    def test_no_avatar_key_when_absent(self):
        data = json.loads(render(normalize(spec())))
        self.assertNotIn("avatar", data)

    def test_local_register(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            people = root / "people"
            people.mkdir()
            (people / "old.json").write_text(
                json.dumps({"id": "old", "name": "旧", "hue": 100, "status": "active"}),
                "utf-8",
            )
            config = Config(token=None, repo=None, content_dir=root)
            publisher = Publisher(config)
            result = publisher.register_persona(spec(hue=200), local=True)
            self.assertTrue(result["ok"])
            path = root / "people" / "new_persona.json"
            self.assertTrue(path.exists())
            data = json.loads(path.read_text("utf-8"))
            self.assertEqual(data["name"], "新人格")
            with self.assertRaises(ValidationError):
                publisher.register_persona(spec(hue=210), local=True)

    def test_local_dry_run(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            config = Config(token=None, repo=None, content_dir=root)
            result = Publisher(config).register_persona(spec(), local=True, dry_run=True)
            self.assertTrue(result["dry_run"])
            self.assertFalse((root / "people" / "new_persona.json").exists())

    def test_auto_persona_plan(self):
        from stide.schema import PostDraft

        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "people").mkdir()
            (root / "people" / "old.json").write_text(
                json.dumps(
                    {
                        "id": "old",
                        "name": "旧",
                        "hue": 100,
                        "signature": "旧签名",
                        "bio": "旧简介",
                        "first_seen": "2026-01-01",
                        "status": "active",
                    }
                ),
                "utf-8",
            )
            config = Config(token=None, repo=None, content_dir=root)
            publisher = Publisher(config)
            auto = PersonaSpec(
                id="auto_1234567890",
                name="新来的人",
                hue=100,
                signature="由 AstrBot 自动注册",
                bio="新来的人的公开日志。",
            )
            result = publisher.publish(
                PostDraft(persona="auto_1234567890", body="第一句。"),
                auto_persona=auto,
                dry_run=True,
            )
            self.assertTrue(result["dry_run"])
            self.assertIn("content/people/auto_1234567890.json", result["files"])
            self.assertNotEqual(result["auto_persona"]["hue"], 100)
            self.assertEqual(result["author"]["name"], "新来的人")
            self.assertFalse((root / "people" / "auto_1234567890.json").exists())

    def test_auto_persona_commits_author_and_post_together(self):
        from stide.schema import PostDraft

        class FakeGitHub:
            def __init__(self):
                self.files = []
                self.message = ""

            def create_commit(self, files, message):
                self.files = files
                self.message = message
                return "deadbeef"

        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "people").mkdir()
            (root / "people" / "old.json").write_text(
                json.dumps(
                    {
                        "id": "old",
                        "name": "旧",
                        "hue": 100,
                        "signature": "签名",
                        "bio": "简介",
                        "first_seen": "2026-01-01",
                        "status": "active",
                    }
                ),
                "utf-8",
            )
            fake = FakeGitHub()
            publisher = Publisher(
                Config(token="x", repo="a/b", content_dir=root),
                github=fake,
            )
            publisher._posts = lambda limit=80: []  # type: ignore[method-assign]
            auto = PersonaSpec(
                id="auto_commit0001",
                name="同 commit 的人",
                hue=200,
                signature="由 AstrBot 自动注册",
                bio="同 commit 的人的公开日志。",
            )
            result = publisher.publish(
                PostDraft(persona="auto_commit0001", body="第一句。"),
                auto_persona=auto,
            )
            paths = [path for path, _ in fake.files]
            self.assertIn("content/people/auto_commit0001.json", paths)
            persona_bytes = dict(fake.files)["content/people/auto_commit0001.json"]
            persona_data = json.loads(persona_bytes)
            self.assertEqual(persona_data["name"], "同 commit 的人")
            self.assertNotIn("avatar", persona_data)
            self.assertTrue(any(path.startswith("content/posts/") for path in paths))
            self.assertIn("Stide-Auto-Persona: auto_commit0001", fake.message)
            self.assertEqual(result["commit_sha"], "deadbeef")
            self.assertEqual(result["author"]["name"], "同 commit 的人")

    def test_auto_persona_name_taken(self):
        from stide.schema import PostDraft

        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "people").mkdir()
            (root / "people" / "old.json").write_text(
                json.dumps(
                    {
                        "id": "old",
                        "name": "嘉心糖",
                        "hue": 38,
                        "signature": "签名",
                        "bio": "简介",
                        "first_seen": "2026-01-01",
                        "status": "active",
                    }
                ),
                "utf-8",
            )
            publisher = Publisher(Config(token=None, repo=None, content_dir=root))
            auto = PersonaSpec(
                id="auto_abcdefghij",
                name="嘉心糖",
                hue=200,
                signature="由 AstrBot 自动注册",
                bio="公开日志。",
            )
            with self.assertRaises(ValidationError) as ctx:
                publisher.publish(
                    PostDraft(persona="auto_abcdefghij", body="第一句。"),
                    auto_persona=auto,
                    dry_run=True,
                )
            self.assertEqual(ctx.exception.code, "PERSONA_NAME_TAKEN")


if __name__ == "__main__":
    unittest.main()
