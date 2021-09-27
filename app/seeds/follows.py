from app.models import db, Follow
from datetime import datetime


def seed_follows():
    first = Follow(user_id=1, subsaiddit_id=1, createdat=datetime.now(), updatedat=datetime.now())

    db.session.add(first)
    db.session.commit()


def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()
