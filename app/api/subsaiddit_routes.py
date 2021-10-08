from sqlalchemy.sql.operators import json_getitem_op
from flask import Blueprint, request
from ..models import Subsaiddit, db
from datetime import datetime

from app.config import Config
from app.aws_s3 import *


subsaiddit_routes = Blueprint('saiddits', __name__)

@subsaiddit_routes.route('')
def subsaiddits():
    subsaiddits = Subsaiddit.query.all()
    return {'subsaiddits' : [{
        'id' : subsaiddit.id,
        'name' : subsaiddit.name,
        'image' : subsaiddit.image,
        'owner_id' : subsaiddit.owner_id,
        'description' : subsaiddit.description,
        'rules' : subsaiddit.rules,
        'moderator_id' : subsaiddit.moderator_id,
        'createdat' : subsaiddit.createdat,
        'updatedat' : subsaiddit.updatedat
    } for subsaiddit in subsaiddits]}


@subsaiddit_routes.route('', methods=['POST'])
def new_subsaiddit():
    if "file" not in request.files:
        return "No user_file key in request.files"

    file = request.files['file']

    if file:
        file_url = upload_file_to_s3(file, Config.S3_BUCKET)
    
    subsaiddit = Subsaiddit(
        name=request.form['name'],
        image=file_url,
        owner_id=int(request.form['owner_id']),
        description=request.form['description'],
        rules=request.form['rules'],
        moderator_id=int(request.form['moderator_id']),
        createdat=datetime.now(),
        updatedat=datetime.now()
    )

    db.session.add(subsaiddit)
    db.session.commit()
    return subsaiddit.to_dict()


@subsaiddit_routes.route('/<int:id>', methods=['DELETE'])
def delete_subsaiddit(id):
    subsaiddit = Subsaiddit.query.get(id)

    db.session.delete(subsaiddit)
    db.session.commit()

    return {}


@subsaiddit_routes.route('/<int:id>', methods=['PUT'])
def update_subsaiddit(id):
<<<<<<< HEAD
=======
    print('*'*50)
    print(request.form['description'])
    print('*'*50)
    if "file" not in request.files:
        subsaiddit = Subsaiddit.query.get(id)

        subsaiddit.name=request.form['name'],
        subsaiddit.description=request.form['description'],
        subsaiddit.rules=request.form['rules'],
        subsaiddit.moderator_id=int(request.form['moderator_id']),
        subsaiddit.updatedat=datetime.now()

        db.session.add(subsaiddit)
        db.session.commit()
        return subsaiddit.to_dict()

    # print('*'*50)
    # print(request.form)
    # print('*'*50)
    file = request.files['file']

    if file:
        file_url = upload_file_to_s3(file, Config.S3_BUCKET)


>>>>>>> main
    subsaiddit = Subsaiddit.query.get(id)

    subsaiddit.name=request.form['name'],
    subsaiddit.image=file_url,
    subsaiddit.description=request.form['description'],
    subsaiddit.rules=request.form['rules'],
    subsaiddit.moderator_id=int(request.form['moderator_id']),
    subsaiddit.updatedat=datetime.now()

    db.session.add(subsaiddit)
    db.session.commit()
    return subsaiddit.to_dict()