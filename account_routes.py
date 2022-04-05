import flask
from flask_login import login_user
from models import Users, db

account_routes = flask.Blueprint(
    "account_routes",
    __name__,
    template_folder="./static/react",
)


@account_routes.route("/login")
def login():
    return flask.render_template("login.html")
