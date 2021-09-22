from sqlalchemy.sql.operators import json_getitem_op
from flask import Blueprint, request
from ..models import Subsaiddit, db
from datetime import datetime

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
    subsaiddit = Subsaiddit(
        name=request.json['name'],
        image=request.json['image'],
        owner_id=int(request.json['owner_id']),
        description=request.json['description'],
        rules=request.json['rules'],
        moderator_id=int(request.json['moderator_id']),
        createdat=datetime.strptime(request.json['createdat'][:-1], '%Y-%m-%dT%H:%M:%S.%f'),
        updatedat=datetime.strptime(request.json['updatedat'][:-1], '%Y-%m-%dT%H:%M:%S.%f')
    )

    db.session.add(subsaiddit)
    db.session.commit()
    return subsaiddit.to_dict()