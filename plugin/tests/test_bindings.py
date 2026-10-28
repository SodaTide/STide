import unittest

from bindings import NoPersona, resolve_persona, session_hash


class BindingTests(unittest.TestCase):
    def setUp(self):
        self.bindings = [
            {"umo": "aiocqhttp:GroupMessage:123", "persona": "jiaxin_tang", "variant": "main"},
            {"umo": "aiocqhttp:GroupMessage:*", "persona": "chaosheng", "variant": "main"},
            {"umo": "telegram:PrivateMessage:9", "persona": "lixia"},
        ]

    def test_exact(self):
        self.assertEqual(resolve_persona("aiocqhttp:GroupMessage:123", self.bindings).persona, "jiaxin_tang")

    def test_platform_wildcard(self):
        self.assertEqual(resolve_persona("aiocqhttp:GroupMessage:999", self.bindings).persona, "chaosheng")

    def test_default(self):
        self.assertEqual(resolve_persona("x:y", [], "wakaba_mutsumi").persona, "wakaba_mutsumi")

    def test_none(self):
        with self.assertRaises(NoPersona):
            resolve_persona("x:y", self.bindings)

    def test_session_hash_stable(self):
        self.assertEqual(session_hash("a:b", "salt"), session_hash("a:b", "salt"))
        self.assertNotEqual(session_hash("a:b", "salt"), session_hash("a:b", "pepper"))


if __name__ == "__main__":
    unittest.main()
