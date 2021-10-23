'''
    Contains common decorators for Flask routes.
    Some generic decorators taken from Vagabond repository:
    https://github.com/CameronWhiteCS/Vagabond
'''

from hci.models import User
from hci.routes import error
from hci.globals import db
from cerberus import Validator
from flask import request, session

def require_authentication(f):
    '''
        Decorator.
        Requires that the incoming request's
        associated session has the 'uid' variable set
        to a valid user ID. An associated instance of the
        hci.models.User model is then provided to
        the subsequent function as a key word argument. 
    '''
    def wrapper(*args, **kwargs):
        
        if 'uid' not in session:
            return error('You must be signed in to perform this operation.')
        else:
            user = db.session.query(User).get(session['uid'])
            if not user:
                return error('Invalid session.')
            return f(user=user, *args, **kwargs)

    wrapper.__name__ = f.__name__
    return wrapper


def validate(schema):
    '''
        Decorator. Can be anywhere where the Flask request object is visible. 
        Can optionally return a response object in the event of an error when validating. 

        Validates JSON POST data according to
        the python-cerbeus schema provided
        as an argument. If the data does not
        match the schema or no POST data is
        provided, a 400 BAD REQUEST error is
        thrown.
    '''
    def decorator(f):
        def wrapper(*args, **kwargs):
            if not request.get_json():
                return error('No JSON data provided. Invalid request', 400)

            result = Validator(schema).validate(request.get_json())
            if not result:
                return error('Invalid request', 400)

            return f(*args, **kwargs)
        wrapper.__name__ = f.__name__
        return wrapper
    return decorator

