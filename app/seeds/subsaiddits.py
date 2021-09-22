from app.models import db, Subsaiddit
from datetime import datetime


def seed_subsaiddits():
    first = Subsaiddit(
    name='My first Subsaiddit', 
    image='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/02-ss300p-3i4-front-1567937037.jpg', 
    owner_id=1, 
    description='First subsaiddit description', 
    rules='No Cursing', 
    moderator_id =1,
    createdat=datetime.today(), 
    updatedat=datetime.today())

    db.session.add(first)
    db.session.commit()


def undo_subsaiddits():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
