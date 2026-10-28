import unittest

from stide.schema import (
    Link,
    PostDraft,
    infer_kind,
    validate,
)
from stide.media import MediaFile
from stide.frontmatter import parse, render
from stide.errors import ValidationError


def media(path="media/2026/10/x.png"):
    return MediaFile(
        path=path,
        data=b"",
        mime="image/png",
        width=1600,
        height=900,
        sha256="a" * 64,
        ext=".png",
        alt="图注",
        caption="照片",
    )


class FrontmatterTests(unittest.TestCase):
    def test_roundtrip(self):
        post = PostDraft(
            id="01M5YCZVD024XM2WGZD4TY5GTC",
            persona="lixia",
            title="今天把围裙洗了",
            body="正文第一段。\n\n第二段。",
            kind="story",
            date="2026-10-27T18:02:44+08:00",
            media=(media(),),
            summary="摘要",
        )
        text = render(post)
        parsed, _ = parse(text)
        self.assertEqual(parsed.persona, "lixia")
        self.assertEqual(parsed.title, "今天把围裙洗了")
        self.assertEqual(parsed.kind, "story")
        self.assertEqual(parsed.body, "正文第一段。\n\n第二段。")
        self.assertEqual(parsed.media[0].alt, "图注")
        self.assertEqual(parsed.media[0].caption, "照片")

    def test_link_and_null(self):
        post = PostDraft(persona="a", body="x", link=Link(url="https://example.com", title="例"))
        parsed, _ = parse(render(post))
        self.assertEqual(parsed.link.url, "https://example.com")
        self.assertEqual(parsed.link.title, "例")

    def test_missing_frontmatter(self):
        with self.assertRaises(ValidationError):
            parse("没有 frontmatter")


if __name__ == "__main__":
    unittest.main()
