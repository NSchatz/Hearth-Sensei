import flask
from flask_login import LoginManager, login_user
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv, find_dotenv
import os
from models import Users, db
from account_routes import account_routes
from hearth_routes import hearth_routes

app = flask.Flask(__name__)

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
def load_user(user_name):
    return Users.query.get(user_name)


@app.route("/signup")
def signup():
    return flask.render_template("signup.html")


@app.route("/signup", methods=["POST"])
def signup_post():
    username = flask.request.form.get("username")
    password = flask.request.form.get("password")
    user = Users.query.filter_by(username=username).first()
    if user:
        pass
    else:
        user = Users(username=username,password=generate_password_hash(password, method='sha256'))
        db.session.add(user)
        db.session.commit()

    return flask.redirect(flask.url_for("login"))


@app.route("/login")
def login():
    return flask.render_template("login.html")


@app.route("/login", methods=["POST"])
def login_post():
    username = flask.request.form.get("username")
    password = flask.request.form.get("password")
    user = Users.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        login_user(user)
        return flask.redirect(flask.url_for("hearth_routes.index"))

    else:
        flask.flash("You don't have an account please sign up!")
    return flask.redirect("login")



app.register_blueprint(account_routes)
app.register_blueprint(hearth_routes)

db.init_app(app)
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(
        host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", "8080")), debug=True
    )
