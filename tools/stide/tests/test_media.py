import base64
import tempfile
import unittest
from pathlib import Path

from stide.media import load_media, probe_size, sniff_mime
from stide.errors import ValidationError

PNG_1PX = base64.b64decode(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
)


class MediaTests(unittest.TestCase):
    def test_png(self):
        self.assertEqual(sniff_mime(PNG_1PX), "image/png")
        self.assertEqual(probe_size(PNG_1PX, "image/png"), (1, 1))

    def test_reject_svg(self):
        data = b'<svg xmlns="http://www.w3.org/2000/svg"></svg>'
        self.assertIsNone(sniff_mime(data))
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "x.svg"
            path.write_bytes(data)
            with self.assertRaises(ValidationError):
                load_media(path)

    def test_size_limit(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "x.png"
            path.write_bytes(PNG_1PX)
            with self.assertRaises(ValidationError):
                load_media(path, max_bytes=10)

    def test_missing(self):
        with self.assertRaises(ValidationError):
            load_media(Path(tempfile.gettempdir()) / "definitely-missing-stide.png")


if __name__ == "__main__":
    unittest.main()
