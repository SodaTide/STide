import base64
import unittest
from datetime import datetime, timedelta, timezone

from stide.media import load_media, probe_size, sniff_mime
from stide.schema import Link, PostDraft, infer_kind, validate
from stide.errors import ValidationError

PNG_1PX = base64.b64decode(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
)


class KindTests(unittest.TestCase):
    def test_links_win(self):
        draft = PostDraft(persona="a", body="x", link=Link(url="https://example.com"))
        self.assertEqual(infer_kind(draft), "link")

    def test_photo_without_title(self):
        media = load_media_from_bytes(PNG_1PX)
        self.assertEqual(infer_kind(PostDraft(persona="a", body="一张图", media=(media,))), "photo")

    def test_story_needs_title(self):
        self.assertEqual(infer_kind(PostDraft(persona="a", body="x" * 300, title="标题")), "story")
        self.assertEqual(infer_kind(PostDraft(persona="a", body="x" * 300)), "note")

    def test_explicit_kind_wins(self):
        draft = PostDraft(persona="a", body="x", kind="note", title="标题")
        self.assertEqual(infer_kind(draft), "note")


def load_media_from_bytes(data: bytes):
    import tempfile
    from pathlib import Path
    from dataclasses import replace

    with tempfile.TemporaryDirectory() as tmp:
        path = Path(tmp) / "a.png"
        path.write_bytes(data)
        media = load_media(path)
    return replace(media, alt="测试图")


class ValidateTests(unittest.TestCase):
    def now(self):
        return datetime(2026, 10, 29, 12, 0, tzinfo=timezone.utc)

    def test_note_ok(self):
        post = validate(PostDraft(persona="jiaxin_tang", body="今天前半段"), now=self.now())
        self.assertEqual(post.kind, "note")

    def test_story_short_rejected(self):
        with self.assertRaises(ValidationError):
            validate(PostDraft(persona="a", title="标题", body="太短"), now=self.now())

    def test_note_too_long(self):
        with self.assertRaises(ValidationError):
            validate(PostDraft(persona="a", body="字" * 601), now=self.now())

    def test_title_too_long(self):
        with self.assertRaises(ValidationError):
            validate(PostDraft(persona="a", title="标" * 61, body="x" * 300), now=self.now())

    def test_http_link_rejected(self):
        with self.assertRaises(ValidationError):
            validate(
                PostDraft(persona="a", body="看这个", link=Link(url="http://example.com")), now=self.now()
            )

    def test_missing_alt_rejected(self):
        media = load_media_from_bytes(PNG_1PX)
        post = PostDraft(persona="a", body="图", media=(media,), title=None)
        # replace alt to empty
        from dataclasses import replace

        with self.assertRaises(ValidationError):
            validate(PostDraft(persona="a", body="图", media=(replace(media, alt=""),)), now=self.now())

    def test_external_link_limit(self):
        body = " ".join(f"[{i}](https://example.com/{i})" for i in range(4))
        with self.assertRaises(ValidationError):
            validate(PostDraft(persona="a", body=body), now=self.now())

    def test_date_window(self):
        old = self.now() - timedelta(hours=25)
        with self.assertRaises(ValidationError):
            validate(PostDraft(persona="a", body="x", date=old), now=self.now())
        validate(PostDraft(persona="a", body="x", date=old), now=self.now(), owner=True)

    def test_people_lookup(self):
        people = {"a": {"status": "active"}}
        post = validate(PostDraft(persona="a", body="x"), people=people, now=self.now())
        self.assertEqual(post.persona, "a")
        with self.assertRaises(ValidationError):
            validate(PostDraft(persona="b", body="x"), people=people, now=self.now())


if __name__ == "__main__":
    unittest.main()
