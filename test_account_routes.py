"""Account Routes unit tests"""
import unittest
from app import app


class TestAccountRoutes(unittest.TestCase):
    """Test Account Routes"""

    def test_login_post(self):
        """tests login response"""
        client = app.test_client(self)
        resp = client.get("/login", content_type="html/text")
        self.assertEqual(resp.status_code, 200)

    def test_login_page_loads(self):
        """tests login load"""
        client = app.test_client(self)
        resp = client.get("login")
        self.assertIn(b"Login", resp.data)

    def test_signup_post(self):
        """tests signup response"""
        client = app.test_client(self)
        resp = client.get("/signup", content_type="html/text")
        self.assertEqual(resp.status_code, 200)

    def test_signup_page_loads(self):
        """tests signup load"""
        client = app.test_client(self)
        resp = client.get("login")
        self.assertIn(b"Sign Up", resp.data)


if __name__ == "__main__":
    unittest.main()
