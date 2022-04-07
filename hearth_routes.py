from os import remove
import flask
import requests
import json
from flask_login import (
    login_required,
    current_user,
    logout_user,
)
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
     return flask.render_template("index.html")

@hearth_routes.route("/getcards", methods=["GET", "POST"])
def getcards():
    response1 = requests.request("GET", url, headers=headers)
    re1 = response1.json()
    filtered = [project for project in re1 if project.get('img') is not None]
    print(filtered)
    return flask.jsonify(filtered)


#     response1 = requests.request("GET", url, headers=headers)
#     re1 = response1.json()
#     clean_data =  json.loads(response1)
#     print(clean_data)
#     for thing in clean_data:
#         if clean_data[0]['img'] == None:
#             clean_data[0].remove[0]
    
#     print(clean_data)
    
#     if flask.request.method == "POST":
#         card = str(flask.request.form.get("card"))
#         card2 = str(flask.request.form.get("card2"))
#         print(card)
#         url2 = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/" + card
#         response2 = requests.request("GET", url2, headers=headers)
#         re2 = response2.json()
#         url3 = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/" + card2
#         response3 = requests.request("GET", url3, headers=headers)
#         re3 = response3.json()
        
#         print(re3)
        
#         return flask.render_template("battle.html", re1=re1, re2=re2, re3=re3)

# @hearth_routes.route("/getcardinfo", methods=["GET", "POST"])
# def getcardinfo():
#     revs = []
#     user = current_user.username
#     ratings = Ratings.query.filter_by(user=user).all()
#     i = 0
#     for things in ratings:
#         revs.append(
#             {
#                 "index": i,
#                 "id": things.id,
#                 "movieid": things.movieid,
#                 "rating": things.rating,
#                 "review": things.comment,
#             }
#         )
#         i += 1
#     return jsonify(revs)

