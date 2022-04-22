import os
import flask
from flask_login import LoginManager
from dotenv import load_dotenv, find_dotenv
from models import Users, db
from account_routes import account_routes
from hearth_routes import hearth_routes

app = flask.Flask(__name__, template_folder="./static/react")

load_dotenv(find_dotenv())
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
SECRET_KEY = os.getenv("SECRET_KEY")
app.config["SECRET_KEY"] = SECRET_KEY

uri = os.getenv("DATABASE_URL")
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)
app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

login_manager = LoginManager()
login_manager.login_view = "account_routes.login"
login_manager.init_app(app)


@login_manager.user_loader
def load_user(id):  # pylint:disable=invalid-name
    return Users.query.get(int(id))


app.register_blueprint(account_routes)
app.register_blueprint(hearth_routes)


@app.errorhandler(404)
def not_found(e):  # pylint:disable=invalid-name
    """this is necessary for react router to work with flask"""
    return flask.render_template("index.html")


db.init_app(app)
with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(
        host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", "8080")), debug=True
    )
