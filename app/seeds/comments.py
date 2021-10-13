from app.models import db, Comment
from datetime import datetime


def seed_comments():
    eng_comment_1 = Comment(user_id=1, post_id=1, parent_id=None, content='My first comment', createdat=datetime.now(), updatedat=datetime.now())
    eng_comment_2 = Comment(user_id=1, post_id=1, parent_id=1, content='My second comment', createdat=datetime.now(), updatedat=datetime.now())
    eng_comment_3 = Comment(user_id=1, post_id=1, parent_id=1, content='My third comment', createdat=datetime.now(), updatedat=datetime.now())
    eng_comment_4 = Comment(user_id=1, post_id=1, parent_id=2, content='My fourth comment', createdat=datetime.now(), updatedat=datetime.now())
    eng_comment_5 = Comment(user_id=1, post_id=1, parent_id=3, content='My fifth comment', createdat=datetime.now(), updatedat=datetime.now())
    eng_comment_6 = Comment(user_id=1, post_id=1, parent_id=4, content='My sixth comment', createdat=datetime.now(), updatedat=datetime.now())

    db.session.add(eng_comment_1)
    db.session.add(eng_comment_2)
    db.session.add(eng_comment_3)
    db.session.add(eng_comment_4)
    db.session.add(eng_comment_5)
    db.session.add(eng_comment_6)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
