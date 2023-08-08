"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from base64 import b64encode
from werkzeug.security import generate_password_hash, check_password_hash
import os

api = Blueprint('api', __name__)


def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(password_hash, password, salt):
    return check_password_hash(password_hash, f"{password}{salt}")

@api.route('/signup', methods=['POST'])
def register_user():

    body = request.json 
    email= body.get('email', None)
    password= body.get('password', None)

    if email is None or password is None:
        return jsonify({"msg": "Faltan campos por rellenar"}), 400
    user= User.query.filter_by(email= email).first()
    if user is not None:
        return jsonify({"msg": "Este email ya existe"}), 400
    password_salt= b64encode(os.urandom(32)).decode("utf-8")
    password_hash= set_password(password, password_salt)
    new_user= User(email = email, password = password_hash, salt = password_salt)
    db.session.add(new_user)
    try:
        db.session.commit()
        return jsonify({"msg": "Usuario creado"}), 201

    except Exception as error:
        return jsonify({"msg": f"{error.args}"}), 500

@api.route('/login', methods=['POST'])
def login():

    body = request.json 
    email= body.get('email', None)
    password= body.get('password', None)

    if email is None or password is None:
        return jsonify({"msg": "Faltan campos por rellenar"}), 400
    user= User.query.filter_by(email= email).first()
    if user is None:
        return jsonify({"msg": "Credenciales invalidas"}), 400
    if check_password(user.password, password, user.salt):
        token= create_access_token(identity= user.id)
        return jsonify({"token": token}), 200
    else:
        return jsonify({"msg": "Credenciales invalidas"}), 400

@api.route('/userData' , methods=['GET'])
@jwt_required()
def get_user_data():

    user_id= get_jwt_identity()
    user= User.query.get(user_id)
    return jsonify({"user": user.serialize()}), 200
