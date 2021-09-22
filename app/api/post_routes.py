from sqlalchemy.sql.operators import json_getitem_op
from app.models import post, subsaiddit
from flask import Blueprint, request
from ..models import Post, db
from datetime import datetime

post_routes = Blueprint('posts', __name__)

@post_routes.route('')
def posts():
    posts = Post.query.all()
    print('*'*36, posts)
    return {'posts' : [{
        'id' : post.id,
        'title' : post.title,
        'content' : post.content,
        'image' : post.image,
        'owner_id' : post.owner_id,
        'subsaiddit_id' : post.subsaiddit_id,
        'createdat' : post.createdat,
        'updatedat' : post.updatedat
    } for post in posts]}


@post_routes.route('', methods=['POST'])
def new_post():
    print('*'*50)
    print('here in the post route, the request is ', request.json)
    post = Post(
        title=request.json['title'],
        content=request.json['content'],
        image=request.json['image'],
        owner_id=int(request.json['ownerId']),
        subsaiddit_id=int(request.json['subsaidditId']),
        createdat=datetime.strptime(request.json['createdat'][:-1], '%Y-%m-%dT%H:%M:%S.%f'),
        updatedat=datetime.strptime(request.json['updatedat'][:-1], '%Y-%m-%dT%H:%M:%S.%f')
    )

    db.session.add(post)
    db.session.commit()
    return post.to_dict()