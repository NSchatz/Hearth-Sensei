import flask
from flask_login import (
    login_required,
    current_user,
    logout_user,
)

hearth_routes = flask.Blueprint(
    "hearth_routes",
    __name__,
    template_folder="./static/react",
)


@hearth_routes.route("/")
@login_required
def index():
    return flask.render_template("index.html")
