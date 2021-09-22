from app.seeds.comments import seed_comments, undo_comments
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .comments import seed_comments, undo_comments
from .follows import seed_follows, undo_follows
from .posts import seed_posts, undo_posts
from .postvotes import seed_postvotes, undo_postvotes
from .subsaiddits import seed_subsaiddits, undo_subsaiddits

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_subsaiddits()
    seed_posts()
    seed_follows()
    seed_comments()
    seed_postvotes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_subsaiddits()
    undo_posts()
    undo_follows()
    undo_comments()
    undo_postvotes()
    # Add other undo functions here
