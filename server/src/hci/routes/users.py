from flask import request, make_response
from hci.decorators import require_authentication
from hci.globals import app, db
from hci.models import User
from hci.routes import error

@app.route('/api/v1/user/<id>')
def route_get_user_by_id(id):

    user = db.session.query(User).get(id)
    if user is None:
        return error('User not found', 404)

    return make_response(user.to_dict(), 200)

@app.route('/api/v1/user/email/<email>')
def route_get_user_by_email(email):
    user = db.session.query(User).filter(User.email==email.lower()).first()
    if user is None:
        return error('User not found', 404)
    return make_response(user.to_dict(), 200)