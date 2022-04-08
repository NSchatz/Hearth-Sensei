import unittest
from app import app, db
from models import Users


class TestAccountRoutes(unittest.TestCase):
    def setup(self):
        db.create_all()
        db.session.add(Users("bob", "bob"))
        db.session.commit()

    def test_login_post(self):
        client = app.test_client(self)
        resp = client.get("/login", content_type="html/text")
        self.assertEqual(resp.status_code, 200)

    def test_login_page_loads(self):
        client = app.test_client(self)
        resp = client.get("login")
        self.assertIn(b"Login", resp.data)

    def test_signup_post(self):
        client = app.test_client(self)
        resp = client.get("/signup", content_type="html/text")
        self.assertEqual(resp.status_code, 200)

    def test_signup_page_loads(self):
        client = app.test_client(self)
        resp = client.get("login")
        self.assertIn(b"Sign Up", resp.data)


if __name__ == "__main__":
    unittest.main()
