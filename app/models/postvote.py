from sqlalchemy.orm import relation, relationship
from .db import db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Numeric, DateTime, Text

class PostVote(db.Model):
    __tablename__ = 'postvotes'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey('users.id'),nullable=False)
    post_id = db.Column(db.Integer, ForeignKey('posts.id'),nullable=False)
    type = db.Column(db.String(5), nullable=False)
    createdat = db.Column(db.DateTime, nullable=False)
    updatedat= db.Column(db.DateTime, nullable=False)

    owner = relationship('User', back_populates='postvotes')
    post = relationship('Post', back_populates='postvotes')