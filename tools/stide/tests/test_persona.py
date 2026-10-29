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


if __name__ == "__main__":
    unittest.main()
