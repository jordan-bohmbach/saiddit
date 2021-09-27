from sqlalchemy.orm import relationship
from .db import db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Numeric, DateTime, Text

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, ForeignKey('posts.id'),nullable=False)
    content = db.Column(db.Text, nullable=False)
    createdat = db.Column(db.DateTime, nullable=False)
    updatedat= db.Column(db.DateTime, nullable=False)

    owner = relationship('User', back_populates='comments')
    post = relationship('Post', back_populates='comments')