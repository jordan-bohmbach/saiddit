from app.models import db, Comment
from datetime import datetime


def seed_comments():
    first = Comment(user_id=1, post_id=1, content='My first comment', createdat=datetime.today(), updatedat=datetime.today())

    db.session.add(first)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
