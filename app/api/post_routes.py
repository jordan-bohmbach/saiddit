from sqlalchemy.sql.operators import json_getitem_op
from app.models import post, subsaiddit
from flask import Blueprint, request
from ..models import Post, db
from datetime import datetime

from app.config import Config
from app.aws_s3 import *


post_routes = Blueprint('posts', __name__)

@post_routes.route('')
def posts():
    posts = Post.query.all()
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
    print(request.files['file'])
    print('*'*50)
    if "file" not in request.files:
        return "No user_file key in request.files"
    
    file = request.files['file']

    if file:
        file_url = upload_file_to_s3(file, Config.S3_BUCKET)

        post = Post(
            title=request.form['title'],
            content=request.form['content'],
            image=file_url,
            owner_id=int(request.form['ownerId']),
            subsaiddit_id=int(request.form['subsaidditId']),
            createdat=datetime.now(),
            updatedat=datetime.now()
        )

        db.session.add(post)
        db.session.commit()
        return post.to_dict()

    else: 
        return 'No File Attached! '


@post_routes.route('/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)

    db.session.delete(post)
    db.session.commit()

    return {}


@post_routes.route('/<int:id>', methods=['PUT'])
def update_post(id):
    # print('*'*50)
    # print(request.files['file'])
    # print('*'*50)

    if "file" not in request.files:
        # the user is not trying to update the picture

        post = Post.query.get(id)
        post.title=request.form['title'],
        post.content=request.form['content'],
        post.owner_id=int(request.form['ownerId']),
        post.subsaiddit_id=int(request.form['subsaidditId']),
        post.updatedat=datetime.now()

        db.session.add(post)
        db.session.commit()
        return post.to_dict()
        
    
    file = request.files['file']

    if file:
        file_url = upload_file_to_s3(file, Config.S3_BUCKET)

    post = Post.query.get(id)
    post.title=request.form['title'],
    post.content=request.form['content'],
    post.image=file_url,
    post.owner_id=int(request.form['ownerId']),
    post.subsaiddit_id=int(request.form['subsaidditId']),
    post.updatedat=datetime.now()

    db.session.add(post)
    db.session.commit()
    return post.to_dict()