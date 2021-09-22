from sqlalchemy.orm import relationship
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    createdat = db.Column(db.Date, nullable=False)
    updatedat= db.Column(db.Date, nullable=False)

    posts = relationship('Post', back_populates='owner') 
    comments = relationship('Comment', back_populates='owner')
    postvotes = relationship('PostVote', back_populates='owner')

    subsaiddits = relationship('Follow', back_populates='follower')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'createdat' : self.createdat,
            'updatedat' : self.updatedat
        }
