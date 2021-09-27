from sqlalchemy.orm import relationship
from .db import db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Numeric, DateTime, Text

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, ForeignKey('users.id'),nullable=False)
    subsaiddit_id = db.Column(db.Integer, ForeignKey('subsaiddits.id'),nullable=False)
    createdat = db.Column(db.DateTime, nullable=False)
    updatedat= db.Column(db.DateTime, nullable=False)

    owner = relationship('User', back_populates='posts')
    subsaiddit = relationship('Subsaiddit', back_populates='posts')
    comments = relationship('Comment', back_populates='post', cascade='all, delete')
    postvotes = relationship('PostVote', back_populates='post', cascade='all, delete')

    def to_dict(self):
        return {
            'id' : self.id,
            'title' : self.title,
            'content' : self.content,
            'image' : self.image,
            'owner_id' : self.owner_id,
            'subsaiddit_id' : self.subsaiddit_id,
            'createdat' : self.createdat,
            'updatedat' : self.updatedat
        }