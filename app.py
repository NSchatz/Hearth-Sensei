import flask
from flask_login import LoginManager
from dotenv import load_dotenv, find_dotenv
import os
from models import Users, db
from account_routes import account_routes
from hearth_routes import hearth_routes

app = flask.Flask(__name__)

load_dotenv(find_dotenv())
SECRET_KEY = os.getenv("SECRET_KEY")
app.config["SECRET_KEY"] = SECRET_KEY

login_manager = LoginManager()
login_manager.login_view = "account_routes.login"
login_manager.init_app(app)


@login_manager.user_loader
def load_user(id):
    return Users.query.get(int(id))


app.register_blueprint(account_routes)
app.register_blueprint(hearth_routes)

app.run(host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", 8080)), debug=True)
