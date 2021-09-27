from sqlalchemy.orm import relationship
from .db import db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Numeric, DateTime, Text

class Subsaiddit(db.Model):
    __tablename__ = 'subsaiddits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(255), nullable=True)
    owner_id = db.Column(db.Integer, ForeignKey('users.id'),nullable=False)
    description = db.Column(db.Text, nullable=False)
    rules = db.Column(db.Text, nullable=False)
    moderator_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    createdat = db.Column(db.DateTime, nullable=False)
    updatedat= db.Column(db.DateTime, nullable=False)

    posts = relationship('Post', back_populates='subsaiddit', cascade='all, delete')
    owner = relationship('User', backref='subsaiddit_owner', foreign_keys=[owner_id])
    moderator = relationship('User', backref='subsaiddit_moderator', foreign_keys=[moderator_id])

    subscribers = relationship('Follow', back_populates='forum')

    def to_dict(self):
        return {
            'id' : self.id,
            'name' : self.name,
            'image' : self.image, 
            'owner_id' : self.owner_id,
            'description' : self.description,
            'rules' : self.rules,
            'moderator_id' : self.moderator_id,
            'createdat' : self.createdat,
            'updatedat' : self.updatedat
        }