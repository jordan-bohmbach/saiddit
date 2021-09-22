from app.models import db, Post
from datetime import datetime


def seed_posts():
    first = Post(title='My first Post', content='The content of my first post', image='https://www.bugatti.com/fileadmin/_processed_/sei/p54/se-image-4799f9106491ebb58ca3351f6df5c44a.jpg', owner_id=1, subsaiddit_id=1, createdat=datetime.today(), updatedat=datetime.today())

    db.session.add(first)
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
