from os import remove
import flask
import requests
import json
from flask_login import (
    login_required,
    current_user,
    logout_user,
)
from models import Users, History, db
headers = {
	"X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
	"X-RapidAPI-Key": "053929e6f4mshfda02829f95e93ep190e5ajsnad031ead6f9f"
}
url = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/types/Minion"

hearth_routes = flask.Blueprint(
    "hearth_routes",
    __name__,
    template_folder="./static/react",
)

@hearth_routes.route("/", methods=["POST", "GET"])
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
  
 @hearth_routes.route("/getcards", methods=["GET", "POST"])
def getcards():
    response1 = requests.request("GET", url, headers=headers)
    re1 = response1.json()
    filtered = [project for project in re1 if project.get('img') is not None]
    print(filtered)
    return flask.jsonify(filtered)

