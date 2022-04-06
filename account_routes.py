import flask
from flask_login import login_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import Users, db

account_routes = flask.Blueprint(
    "account_routes",
    __name__,
    template_folder="./static/react",
)


@account_routes.route("/login")
def login():
    return flask.render_template("login.html", url=flask.url_for("account_routes.signup"))


@account_routes.route("/signup")
def signup():
    return flask.render_template("signup.html", url=flask.url_for("account_routes.login"))


@account_routes.route("/signup", methods=["POST"])
def signup_post():
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
        db.session.add(user)
        db.session.commit()

    return flask.redirect(flask.url_for("account_routes.login"))


@account_routes.route("/login", methods=["POST"])
def login_post():
    username = flask.request.form.get("username")
    password = flask.request.form.get("password")
    user = Users.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        login_user(user)
        return flask.redirect(flask.url_for("hearth_routes.index"))

    else:
        flask.flash("You don't have an account please sign up!")
    return flask.redirect("account_routes.login")