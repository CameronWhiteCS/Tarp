
from flask.helpers import make_response
from hci.globals import app, db
from hci.models import User, Course, CourseEnrollment
from hci.decorators import validate
from hci.routes import error

from flask import request

schema_create_enrollment = {
    'email': {
        'type': 'string',
        'required': True
    },
    'role': {
        'type': 'string',
        'required': True
    },
    'courseId': {
        'type': 'integer',
        'required': True
    }
}

@validate(schema_create_enrollment)
@app.route('/api/v1/enrollment', methods=['POST'])
def route_create_enrollment():
    
    json = request.get_json()

    user = db.session.query(User).filter(User.email==json['email'].lower()).first()
    course = db.session.query(Course).get(json['courseId'])

    if user is None:
        return error('User not found', 404)

    if course is None:
        return error('Course not found', 404)

    course_enrollment = CourseEnrollment()
    course_enrollment.user = user
    course_enrollment.course = course
    course_enrollment.role = json['role']

    db.session.add(course_enrollment)
    db.session.commit()

    return make_response('User enrolled in course', 201)