"""accounts"""
import flask
from flask_login import login_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import Users, db

account_routes = flask.Blueprint(  # pylint:disable=invalid-name
    "account_routes", __name__, template_folder="./static/react"
)


@account_routes.route("/login")
def login():
    """login page"""
    return flask.render_template(
        "login.html", url=flask.url_for("account_routes.signup")
    )


@account_routes.route("/signup")
def signup():
    """signup page"""
    return flask.render_template(
        "signup.html", url=flask.url_for("account_routes.login")
    )


@account_routes.route("/signup", methods=["POST"])
def signup_post():
    """signs up user if account doesn't exist with hashed password"""
    username = flask.request.form.get("username")
    password = flask.request.form.get("password")
    user = Users.query.filter_by(username=username).first()
    if user:
        pass
    else:
        user = Users(
            username=username,
            password=generate_password_hash(password, method="sha256"),
        )
        db.session.add(user)  # pylint:disable=no-member
        db.session.commit()  # pylint:disable=no-member

    return flask.redirect(flask.url_for("account_routes.login"))


@account_routes.route("/login", methods=["POST"])
def login_post():
    """logs in user if account exists"""
    username = flask.request.form.get("username")
    password = flask.request.form.get("password")
    user = Users.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):  # pylint:disable=no-else-return
        login_user(user)
        return flask.redirect(flask.url_for("hearth_routes.index"))

    else:
        flask.flash("You don't have an account please sign up!")
        return flask.redirect(flask.url_for("account_routes.login"))
