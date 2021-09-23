from app.models import db, Post
from datetime import datetime


def seed_posts():
    first_eng = Post(title='Electrical Wiring Schematics', content='I work for an electrical contractor and am looking for the best Computer Aided Design software for generating electrical sechematics. What does everybody here use? Any suggestions?', image='https://www.bugatti.com/fileadmin/_processed_/sei/p54/se-image-4799f9106491ebb58ca3351f6df5c44a.jpg', owner_id=1, subsaiddit_id=1, createdat=datetime.today(), updatedat=datetime.today())
    first_chess = Post(title="Begginer Chess Openings", content="Hi everybody, i am trying to teach my son chess and he is 12. What does everybody think that the best simple openings are for getting him started?", image="https://www.thesprucecrafts.com/thmb/fcAjviTRteRjCOi50OyBnsZk7U8=/1000x1000/filters:no_upscale():max_bytes(150000):strip_icc()/most-common-chess-openings-611517-RuyLopez-9ec96893afdc42689c626dcbc283f993.png", owner_id=2, subsaiddit_id=2, createdat=datetime.today(), updatedat=datetime.today())
    first_software = Post(title='Backend frameworks', content="I am getting started building a full stack web application and I am trying to decide what backend framework to use. My friend says that Express is pretty good but I think i'm going to use Flask so that I don't need to write any complicated Asynch handlers. What do you all use for your applications?", image='https://flask-sqlalchemy.palletsprojects.com/en/2.x/_static/flask-sqlalchemy-logo.png', owner_id=1, subsaiddit_id=3, createdat=datetime.today(), updatedat=datetime.today())
    first_entrepreneurship = Post(title='Investors', content="Hi everybody, we raised a seed round of money from a venture group in california, but unfortunately we have discovered a flaw in the business model that is preventing us from getting enough traction to raise a series A round. Do you think we should return the money to the investors? Or should we keep trying until the bitter end and spend all of the money?", image='https://ied.eu/wp-content/uploads/2018/04/entrepreneurship.png', owner_id=1, subsaiddit_id=4, createdat=datetime.today(), updatedat=datetime.today())

    db.session.add(first_eng)
    db.session.add(first_chess)
    db.session.add(first_software)
    db.session.add(first_entrepreneurship)
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
