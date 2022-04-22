"""hearthstone routes"""
import os
import flask
import requests
from flask_login import login_required, current_user
from models import History, Users, db

headers = {  # pylint:disable=invalid-name
    "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
    "X-RapidAPI-Key": os.getenv("API_KEY"),
}
url = (  # pylint:disable=invalid-name
    "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/types/Minion"
)

hearth_routes = flask.Blueprint(  # pylint:disable=invalid-name
    "hearth_routes", __name__, template_folder="./static/react"
)


def getHistory(user):
    battles = History.query.filter_by(username=user).all()
    battle_history = []
    for battle in battles:
        id = battle.id
        card1 = battle.card1
        card1_attack = battle.card1_attack
        card1_health = battle.card1_health
        card2 = battle.card2
        card2_attack = battle.card2_attack
        card2_health = battle.card2_health
        winner = battle.winner
        battle_history.append(
            {
                "id": id,
                "card1": card1,
                "card1_attack": card1_attack,
                "card1_health": card1_health,
                "card2": card2,
                "card2_attack": card2_attack,
                "card2_health": card2_health,
                "winner": winner,
            }
        )

    return battle_history


@hearth_routes.route("/", methods=["POST", "GET"])
def index():
    """render index"""
    return flask.render_template("index.html")


@hearth_routes.route("/mainUser")
@login_required
def mainUser():
    user = current_user.username

    return flask.jsonify({"username": user})


@hearth_routes.route("/users")
@login_required
def users():
    """Gets a list of users"""
    users = Users.query.all()
    userList = []
    for user in users:
        username = user.username
        userList.append({"username": username})
    return flask.jsonify(userList)


@hearth_routes.route("/history", methods=["GET", "POST"])
@login_required
def history():
    """Get battle history for users"""
    response = flask.request.json
    user = response.get("username")
    battle_history = getHistory(user)

    return flask.jsonify(battle_history)


@hearth_routes.route("/delete", methods=["GET", "POST"])
@login_required
def delete():
    response = flask.request.json
    selection = response.get("selection")
    if selection == "all":
        History.query.filter_by(username=current_user.username).delete()
    else:
        History.query.filter_by(id=selection).delete()
    db.session.commit()
    battle_history = getHistory(current_user.username)

    return flask.jsonify(battle_history)


@hearth_routes.route("/getcards", methods=["GET", "POST"])
@login_required
def getcards():
    """Gets cards"""
    response1 = requests.request("GET", url, headers=headers)
    re1 = response1.json()
    filtered = [project for project in re1 if project.get("img") is not None]
    return flask.jsonify(filtered)


@hearth_routes.route("/savebattle", methods=["POST"])
@login_required
def save_history():
    """Saves history"""
    recent_battle = flask.request.get_json()
    recent_battle = recent_battle["recentBattle"]
    if recent_battle["winner"] == "User":
        recent_battle["winner"] = current_user.username
    battle = History(
        username=current_user.username,
        card1=recent_battle["card1"],
        card1_attack=recent_battle["card1_attack"],
        card1_health=recent_battle["card1_health"],
        card2=recent_battle["card2"],
        card2_attack=recent_battle["card2_attack"],
        card2_health=recent_battle["card2_health"],
        winner=recent_battle["winner"],
    )
    db.session.add(battle)  # pylint:disable=no-member
    db.session.commit()  # pylint:disable=no-member
    return {"code": 200, "description": "Successfully submitted."}


"""
To avoid using tokens so that react app verifies if user is logged in from flask,
this is a workaround by rendering each page through flask then react will display
the corresponding page component.
"""


@hearth_routes.route("/Profile")
@login_required
def profile_component():
    """Profile route"""
    return flask.render_template("index.html")


@hearth_routes.route("/Users")
@login_required
def users_component():
    """User route"""
    return flask.render_template("index.html")


@hearth_routes.route("/battle")
@login_required
def battle_component():
    """Battle route"""
    return flask.render_template("index.html")


@hearth_routes.route("/custombattle")
@login_required
def custom_battle_component():
    """CustomBattle route"""
    return flask.render_template("index.html")
