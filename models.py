"""database models"""
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
import flask

models = flask.Flask(__name__)  # pylint:disable=invalid-name

db = SQLAlchemy()  # pylint:disable=invalid-name

# pylint: disable=no-member
# pylint: disable=too-few-public-methods


class Users(UserMixin, db.Model):
    """Users model"""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)


class History(db.Model):
    """Battle History model"""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    card1 = db.Column(db.String(100), nullable=False)
    card1_attack = db.Column(db.Integer)
    card1_health = db.Column(db.Integer)
    card2 = db.Column(db.String(100), nullable=False)
    card2_attack = db.Column(db.Integer)
    card2_health = db.Column(db.Integer)
    winner = db.Column(db.String(100), nullable=False)
