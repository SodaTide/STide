import unittest

from guards import Deduper, GuardError, RateLimiter, check_banned

# stide-privacy: allow cn-mobile 下面用的是 RFC 见过的示例号码 13800138000，用于测试隐私正则


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
        self.assertEqual(limiter.remaining("a"), 0)

    def test_remaining_and_countdown(self):
        limiter = RateLimiter(daily_limit_per_persona=3, min_interval_minutes=5)
        self.assertEqual(limiter.remaining("a"), 3)
        limiter.record("a", now=100)
        self.assertEqual(limiter.remaining("a"), 2)
        self.assertEqual(limiter.next_allowed_in("a", now=100), 300)
        self.assertEqual(limiter.next_allowed_in("a", now=400), 0)
        self.assertEqual(limiter.next_allowed_in("b"), 0)

    def test_interval(self):
        limiter = RateLimiter(min_interval_minutes=5)
        limiter.record("a", now=100)
        with self.assertRaises(GuardError) as ctx:
            limiter.check("a", now=200)
        self.assertEqual(ctx.exception.retry_after, 200)

    def test_dedupe(self):
        deduper = Deduper(window_seconds=60)
        deduper.check("同一句", now=100)  # 只查不记：失败不该占掉窗口
        deduper.record("同一句", now=100)
        with self.assertRaises(GuardError) as ctx:
            deduper.check("同一句", now=120)
        self.assertEqual(ctx.exception.code, "DUPLICATE")
        deduper.check("同一句", now=200)  # 窗口外放行

    def test_dedupe_prune(self):
        deduper = Deduper(window_seconds=60)
        for i in range(5):
            deduper.record(f"第 {i} 句", now=100)
        deduper.prune(now=200)
        self.assertEqual(len(deduper._seen), 0)

    def test_banned(self):
        with self.assertRaises(GuardError):
            check_banned("电话 13800138000")


if __name__ == "__main__":
    unittest.main()
