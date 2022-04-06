import flask
from flask_login import (
    login_required,
    current_user,
    logout_user,
)
from models import Users, History, db

hearth_routes = flask.Blueprint(
    "hearth_routes",
    __name__,
    template_folder="./static/react",
)


@hearth_routes.route("/")
@login_required
def index():
    return flask.render_template(
        "index.html", url=flask.url_for("hearth_routes.profile")
    )


@hearth_routes.route("/profile")
def profile():
    history = History.query.filter_by(username=current_user.username).all()
    return flask.render_template(
        "profile.html", history=history, url=flask.url_for("hearth_routes.index")
    )
