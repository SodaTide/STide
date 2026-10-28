import unittest

from stide.ulid import is_ulid, ulid


class UlidTests(unittest.TestCase):
    def test_shape(self):
        value = ulid(now_ms=1700000000000, randomness=b"\x00" * 10)
        self.assertEqual(len(value), 26)
        self.assertTrue(is_ulid(value))
        self.assertEqual(value[:10], "01HF7YAT00")

    def test_invalid(self):
        self.assertFalse(is_ulid("not-a-ulid"))
        self.assertFalse(is_ulid("I" * 26))


if __name__ == "__main__":
    unittest.main()
