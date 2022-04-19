"""hearthstone routes"""
import os
import flask
import requests
from flask_login import login_required, current_user
from models import History, db

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


@hearth_routes.route("/", methods=["POST", "GET"])
@login_required
def index():
    """render index"""
    return flask.render_template("index.html")


@hearth_routes.route("/battles")
def battles():
    """Gets battle history"""
    battles = History.query.filter_by(username=current_user.username).all()
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
    return flask.jsonify(battle_history)


@hearth_routes.route("/delete", methods=["GET", "POST"])
def delete():
    response = flask.request.json
    id = response.get("id")
    History.query.filter_by(id=id).delete()
    db.session.commit()

    return flask.redirect(flask.url_for("hearth_routes.battles"))


@hearth_routes.route("/deleteAll", methods=["GET", "POST"])
def deleteAll():
    History.query.filter_by(username=current_user.username).delete()
    db.session.commit()

    return flask.redirect(flask.url_for("hearth_routes.battles"))


@hearth_routes.route("/getcards", methods=["GET", "POST"])
def getcards():
    """Gets cards"""
    response1 = requests.request("GET", url, headers=headers)
    re1 = response1.json()
    filtered = [project for project in re1 if project.get("img") is not None]
    return flask.jsonify(filtered)


@hearth_routes.route("/savebattle", methods=["POST"])
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
