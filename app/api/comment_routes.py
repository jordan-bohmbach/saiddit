from sqlalchemy.sql.operators import json_getitem_op
from app.models import post, subsaiddit
from flask import Blueprint, request
from ..models import Comment, db
from datetime import datetime


comment_routes = Blueprint('comments', __name__)

@comment_routes.route('')
def comments():
    comments = Comment.query.all()
    return {'comments' : [comment.to_dict() for comment in comments]}


@comment_routes.route('', methods=['POST'])
def new_comment():
    print('*'*50)
    print(request.form)
    if (request.form['parent_id'] is None):
        comment = Comment(
            user_id=int(request.form['user_id']),
            post_id=int(request.form['post_id']),
            parent_id=None,
            content=request.form['content'],
            createdat=datetime.now(),
            updatedat=datetime.now()
        )
    else: 
        comment = Comment(
            user_id=int(request.form['user_id']),
            post_id=int(request.form['post_id']),
            parent_id=int(request.form['parent_id']),
            content=request.form['content'],
            createdat=datetime.now(),
            updatedat=datetime.now()
        )

    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()

@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment():
    comment = Comment.query.get(id)

    db.session.delete(comment)
    db.session.commit()

    return {}


@comment_routes.route('/<int:id>', methods=['PUT'])
def update_comment():
    comment = Comment.query.get(id)

    comment.user_id=int(request.json['user_id']),
    comment.post_id=int(request.json['post_id']),
    comment.parent_id=int(request.json['parent_id']),
    comment.content=request.json['content'],
    comment.createdat=datetime.now(),
    comment.updatedat=datetime.now()

    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()