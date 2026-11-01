"""发布窗口与去重的回归（03 §4.3）。"""

import unittest
from datetime import datetime, timedelta, timezone

from stide.schema import within_dedupe_window


class DedupeWindowTests(unittest.TestCase):
    def setUp(self):
        self.now = datetime(2026, 10, 30, 12, 0, tzinfo=timezone.utc)

    def test_short_body_uses_24h_window(self):
        self.assertTrue(within_dedupe_window(self.now - timedelta(hours=1), self.now, 20))
        self.assertTrue(within_dedupe_window(self.now - timedelta(hours=23), self.now, 199))
        self.assertFalse(within_dedupe_window(self.now - timedelta(hours=30), self.now, 199))

    def test_long_body_uses_30d_window(self):
        self.assertTrue(within_dedupe_window(self.now - timedelta(days=20), self.now, 200))
        self.assertTrue(within_dedupe_window(self.now - timedelta(days=29), self.now, 5000))
        self.assertFalse(within_dedupe_window(self.now - timedelta(days=40), self.now, 500))

    def test_boundary_is_inclusive(self):
        self.assertTrue(within_dedupe_window(self.now - timedelta(hours=24), self.now, 10))
        self.assertTrue(within_dedupe_window(self.now - timedelta(days=30), self.now, 800))


if __name__ == "__main__":
    unittest.main()
