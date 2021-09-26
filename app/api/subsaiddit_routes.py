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
    subsaiddit = Subsaiddit.query.get(id)
    print('*'*50)
    print(request.json)
    print('*'*50)

    subsaiddit.name=request.json['name'],
    subsaiddit.image=request.json['image'],
    subsaiddit.description=request.json['description'],
    subsaiddit.rules=request.json['rules'],
    subsaiddit.moderator_id=int(request.json['moderator_id']),
    subsaiddit.updatedat=datetime.strptime(request.json['updatedat'][:-1], '%Y-%m-%dT%H:%M:%S.%f')

    db.session.add(subsaiddit)
    db.session.commit()
    return subsaiddit.to_dict()