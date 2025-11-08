from django.test import TestCase


class BasicTest(TestCase):
    def test_basic(self):
        """Test that basic test works"""
        self.assertEqual(1, 1)
