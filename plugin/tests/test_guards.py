import unittest

from guards import Deduper, GuardError, RateLimiter, check_banned


class GuardTests(unittest.TestCase):
    def test_rate_limit(self):
        limiter = RateLimiter(daily_limit_per_persona=2, min_interval_minutes=0)
        limiter.check("a", now=100)
        limiter.record("a", now=100)
        limiter.check("a", now=200)
        limiter.record("a", now=200)
        with self.assertRaises(GuardError) as ctx:
            limiter.check("a", now=300)
        self.assertEqual(ctx.exception.code, "RATE_LIMITED")

    def test_interval(self):
        limiter = RateLimiter(min_interval_minutes=5)
        limiter.record("a", now=100)
        with self.assertRaises(GuardError) as ctx:
            limiter.check("a", now=200)
        self.assertEqual(ctx.exception.retry_after, 200)

    def test_dedupe(self):
        deduper = Deduper(window_seconds=60)
        deduper.check("同一句", now=100)
        with self.assertRaises(GuardError) as ctx:
            deduper.check("同一句", now=120)
        self.assertEqual(ctx.exception.code, "DUPLICATE")

    def test_banned(self):
        with self.assertRaises(GuardError):
            check_banned("电话 13800138000")


if __name__ == "__main__":
    unittest.main()
