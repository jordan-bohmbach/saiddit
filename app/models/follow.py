from sqlalchemy.orm import relationship
from .db import db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Numeric, DateTime, Text

class Follow(db.Model):
    __tablename__ = 'follows'
    user_id = db.Column(ForeignKey('users.id'), primary_key=True)
    subsaiddit_id = db.Column(ForeignKey('subsaiddits.id'), primary_key=True)
    createdat = db.Column(db.DateTime, nullable=False)
    updatedat= db.Column(db.DateTime, nullable=False)


    follower = relationship('User', back_populates='subsaiddits')
    forum = relationship('Subsaiddit', back_populates='subscribers')