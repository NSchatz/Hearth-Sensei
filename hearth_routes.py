from os import remove
import flask
import requests
import json
import os
from flask_login import (
    login_required,
    current_user,
    logout_user,
)
headers = {
	"X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
	"X-RapidAPI-Key": os.getenv("API_KEY")
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
     return flask.render_template("index.html")

@hearth_routes.route("/getcards", methods=["GET", "POST"])
def getcards():
    response1 = requests.request("GET", url, headers=headers)
    re1 = response1.json()
    filtered = [project for project in re1 if project.get('img') is not None]
    print(filtered)
    return flask.jsonify(filtered)