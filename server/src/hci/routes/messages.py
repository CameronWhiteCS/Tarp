from flask import make_response, jsonify, request
from sqlalchemy.orm import with_polymorphic

from hci.globals import app, db
from hci.models import Message, Email


@app.route('/api/v1/messages', methods=['GET'])
def route_get_all_messages():

    messages = db.session.query(with_polymorphic(Message, [Email])).all()

    output = []

    for message in messages:
        output.append(message.to_dict())

    return make_response(jsonify(output), 200)


@app.route('/api/v1/message/<id>', methods=['POST', 'PUT', 'DELETE'])
def route_message(id):

    # Method definitions for this route
    def create_message(message):
        pass

    def modify_message(message):

        json = request.json

        if json.get('content') is not None:
            message.content = json['content']

        if json.get('isRead') is not None:
            message.is_read = json['isRead']

        if json.get('isAutomated') is not None:
            message.is_automated = json['isAutomated']

        if json.get('isDeleted') is not None:
            message.is_deleted = json['isDeleted']

        if json.get('isFavorited') is not None:
            message.is_favorited = json['isFavorited']

        db.session.commit()

        return make_response('Message modified', 200)


    def delete_message(message):
        db.session.delete(message)
        db.session.commit()
        return make_response('Message deleted', 200)

    # Route logic
    message = db.session.query(Message).get(id)
    if message is None:
        return make_response('Message not found', 404)

    if request.method == 'POST':
        pass
    elif request.method == 'PUT':
        return modify_message(message)
    elif request.method == 'DELETE':
        return delete_message(message)
