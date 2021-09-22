from app.models import db, PostVote
from datetime import datetime


def seed_postvotes():
    first = PostVote(owner_id=1, post_id=1, type='UP', createdat=datetime.today(), updatedat=datetime.today())

    db.session.add(first)
    db.session.commit()


def undo_postvotes():
    db.session.execute('TRUNCATE postvotes RESTART IDENTITY CASCADE;')
    db.session.commit()
