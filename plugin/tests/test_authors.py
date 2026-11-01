import unittest

from stide_core.persona import author_directory, suggest_authors

PEOPLE = {
    "chaosheng": {"id": "chaosheng", "name": "潮声", "hue": 188, "status": "active"},
    "jiaxin_tang": {"id": "jiaxin_tang", "name": "嘉心糖", "hue": 38, "status": "active"},
    "lixia": {"id": "lixia", "name": "立夏", "hue": 96, "status": "active"},
    "wakaba_mutsumi": {"id": "wakaba_mutsumi", "name": "若叶睦", "hue": 158, "status": "active"},
    "old_face": {"id": "old_face", "name": "退休的", "hue": 300, "status": "retired"},
}


class AuthorHintTests(unittest.TestCase):
    def test_directory_skips_retired(self):
        ids = [row["id"] for row in author_directory(PEOPLE)]
        self.assertIn("jiaxin_tang", ids)
        self.assertNotIn("old_face", ids)
        self.assertIn("old_face", [row["id"] for row in author_directory(PEOPLE, include_retired=True)])

    def test_confusable_typos_resolve(self):
        # 模型把「嘉心糖」写成「夹心糖」是常见错字
        for wrong in ("夹心糖", "佳心糖", "嘉心糖"):
            names = [row["name"] for row in suggest_authors(wrong, PEOPLE)]
            self.assertEqual(names[0], "嘉心糖", wrong)

    def test_other_typos(self):
        self.assertEqual(suggest_authors("潮生", PEOPLE)[0]["name"], "潮声")
        self.assertEqual(suggest_authors("立下", PEOPLE)[0]["name"], "立夏")
        self.assertEqual(suggest_authors("若叶", PEOPLE)[0]["name"], "若叶睦")

    def test_unknown_persona_has_no_suggestion(self):
        self.assertEqual(suggest_authors("完全不相关的人", PEOPLE), [])

    def test_suggestion_never_returns_identity_field(self):
        """建议只是提示，不是可写字段：模型不能用它改作者。"""
        row = suggest_authors("夹心糖", PEOPLE)[0]
        self.assertEqual(set(row), {"id", "name", "status", "score"})


class NoPersonaDetailTests(unittest.TestCase):
    def test_unknown_persona_lists_available(self):
        from stide_core.errors import ValidationError
        from stide_core.schema import PostDraft, validate

        with self.assertRaises(ValidationError) as ctx:
            validate(PostDraft(persona="jiating", body="一句话"), people=PEOPLE)
        err = ctx.exception
        self.assertEqual(err.code, "NO_PERSONA")
        self.assertIn("jiaxin_tang", err.details["available_personas"])
        self.assertNotIn("old_face", err.details["available_personas"])

    def test_typo_persona_gets_suggestion(self):
        from stide_core.errors import ValidationError
        from stide_core.schema import PostDraft, validate

        with self.assertRaises(ValidationError) as ctx:
            validate(PostDraft(persona="夹心糖", body="一句话"), people=PEOPLE)
        # 「夹心糖」不符合 PERSONA_RE（含非 ASCII），先撞 BAD_PERSONA；
        # 走 ASCII id 的错拼时才有建议。
        self.assertIn(ctx.exception.code, {"BAD_PERSONA", "NO_PERSONA"})

        with self.assertRaises(ValidationError) as ctx2:
            validate(PostDraft(persona="jiaxin", body="一句话"), people=PEOPLE)
        self.assertEqual(ctx2.exception.code, "NO_PERSONA")
        self.assertTrue(ctx2.exception.details["suggestions"])


if __name__ == "__main__":
    unittest.main()
