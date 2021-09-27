from app.models import db, Subsaiddit
from datetime import datetime


def seed_subsaiddits():
    eng = Subsaiddit(
    name='Engineering', 
    image='https://d3jh33bzyw1wep.cloudfront.net/s3/W1siZiIsIjIwMTkvMTEvMjEvMTIvMDYvMjcvMzIvc2h1dHRlcnN0b2NrXzE0OTg3NDI1MTkuanBnIl0sWyJwIiwidGh1bWIiLCIxMjAweDYzMCMiXV0',
    owner_id=3, 
    description='For engineers to connect and learn from each other', 
    rules='No Cursing', 
    moderator_id =3,
    createdat=datetime.now(), 
    updatedat=datetime.now())

    chess = Subsaiddit(
    name='Chess', 
    image='https://images.ctfassets.net/3s5io6mnxfqz/wfAz3zUBbrcf1eSMLZi8u/c03ac28c778813bd72373644ee8b8b02/AdobeStock_364059453.jpeg?fm=jpg&w=900&fl=progressive', 
    owner_id=2, 
    description='For chess players to discuss strategy', 
    rules='No Cursing', 
    moderator_id =1,
    createdat=datetime.now(), 
    updatedat=datetime.now())

    software = Subsaiddit(
    name='Software', 
    image='https://i.pcmag.com/imagery/articles/0270lteaknt7h4pBahOR4az-40..1580751227.jpg', 
    owner_id=1, 
    description='For developers to discuss trade secrets, frameworks, and new topics related to software engineering or the software industry', 
    rules='No Cursing', 
    moderator_id =1,
    createdat=datetime.now(), 
    updatedat=datetime.now())

    entrepreneur = Subsaiddit(
    name='Entrepreneurship', 
    image='https://i0.wp.com/www.iedunote.com/img/245/entrepreneurship-what-is-the-modern-definition-of-entrepreneur.jpg?fit=2190%2C1689&quality=100&ssl=1', 
    owner_id=1, 
    description='For entrepreneurs to meet and learn from each other', 
    rules='No Cursing', 
    moderator_id =1,
    createdat=datetime.now(), 
    updatedat=datetime.now())

    db.session.add(eng)
    db.session.add(chess)
    db.session.add(software)
    db.session.add(entrepreneur)
    db.session.commit()


def undo_subsaiddits():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
