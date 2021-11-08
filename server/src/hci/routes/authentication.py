'''
    Routes for creating users, signing in,
    signing out, and checking if you're signed in or not.
'''

from flask import request, make_response, session
import bcrypt
from hci.models import User
from hci.regex import EMAIL
from hci.decorators import validate, require_authentication
from hci.globals import app, db
from .util import error

def get_user_data(user):
    return {
        'id': user.id,
        'isAdmin': user.is_admin
    }

@app.route('/api/v1/user', methods=['POST'])
def route_create_account():
    if request.method == 'POST':
        return create_user(request.json)

schema_create_user = {
    'firstName': {
        'type': 'string',
        'required': True
    },
    'lastName': {
        'type': 'string',
        'required': True
    },
    'email': {
        'type': 'string',
        'required': True,
        'regex': EMAIL
    },
    'password': {
        'type': 'string',
        'required': True
    },
    'passwordConfirm': {
        'type': 'string',
        'required': True
    }
}

@validate(schema_create_user)
def create_user(json):

    if json['password'] != json['passwordConfirm']:
        return error('Passwords must match')

    password_hash = bcrypt.hashpw(bytes(json['password'], 'utf-8'), bcrypt.gensalt())

    # Make sure email is lower case before entering into DB to avoid issues with duplicate emails
    email = json['email'].lower()

    existing_user = db.session.query(User).filter(User.email == email).first()

    if existing_user is not None:
        return error('That email address is unavailable.')
    
    new_user = User(
        first_name=json['firstName'],
        last_name=json['lastName'],
        email=email,
        password_hash=password_hash
    )

    db.session.add(new_user)
    db.session.flush()
    session['uid'] = new_user.id


    db.session.commit()
    return make_response(get_user_data(new_user), 200)



@app.route('/api/v1/signout', methods=['POST'])
@require_authentication
def route_signout(user):
    session.clear()
    return make_response('', 200)


schema_signin = {
    'email': {
        'type': 'string',
        'required': True,
        'regex': EMAIL
    },
    'password': {
        'type': 'string',
        'required': True
    }
}



@app.route('/api/v1/signin', methods=['POST'])
@validate(schema_signin)
def route_signin():
    email = request.get_json().get('email')
    password = request.get_json().get('password')

    if 'uid' in session:
        return error('You are currently signed in. Please sign out before trying to sign in.')

    err_msg = 'Invalid username or password.'
        
    user = db.session.query(User).filter(db.func.lower(User.email) == db.func.lower(email)).first()
        
    if user is None:    
        return error(err_msg)

    if not bcrypt.checkpw(bytes(password, 'utf-8'), bytes(user.password_hash, 'utf-8')):
        return error(err_msg)

    session['uid'] = user.id
            
    return make_response(get_user_data(user), 200)

@app.route('/api/v1/session')
def route_session_check(user=None):

    # We can't use require_authentication due to some special
    # handling here. 

        if 'uid' not in session:
            return error('You must be signed in to perform this operation.')
        else:
            user = db.session.query(User).get(session['uid'])
            if not user:
                session.clear()
                return error('Invalid session.')
            return make_response(get_user_data(user), 200)
