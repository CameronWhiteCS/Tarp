from flask import Blueprint, request
from hci.models import User, Course

authentication_routes = Blueprint('authentication_routes', __name__)


@authentication_routes.route('/api/v1/user', methods=['POST', 'GET', 'DELETE'])
def create_account():
    if request.method == 'POST':
        return 'This is a POST method test'
    elif request.method == 'GET':
        return 'This is a GET method test'
    elif request.method == 'DELETE':
        return 'This is a DELETE method test'
