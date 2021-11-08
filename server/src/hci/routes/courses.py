from flask import make_response, jsonify, request
from hci.globals import app, db
from hci.models import Course, CourseEnrollment
from hci.decorators import require_authentication, validate
from cerberus import Validator

schema_create_course = {

    'title': {
        'type': 'string',
        'required': True
    },
    'code': {
        'type': 'string',
        'required': True
    },
    'description': {
        'type': 'string',
        'required': True
    }

}

@validate(schema_create_course)
@require_authentication
def create_course(user=None):
    if not user.is_admin:
        return make_response('Only administrators can create a course.', 401)

    json = request.get_json()

    new_course = Course()
    new_course.title = json['title']
    new_course.code = json['code']
    new_course.description = json['description']

    db.session.add(new_course)
    db.session.commit()

    return make_response('Course created', 201)
    


@require_authentication
def modify_course(id, user=None):

    if not user.is_admin:
        return make_response('Only administrators can update a course.', 401)

    course = db.session.query(Course).get(id)
    if course is None:
        return make_response('Course not found', 404)

    json = request.get_json()

    if 'title' in json:
        course.title = json['title']

    if 'code' in json:
        course.code = json['code']    

    if 'description' in json:
        course.description = json['description']

    db.session.add(course)
    db.session.commit()

    return make_response('Course updated', 200)



@require_authentication
def delete_course(id, user=None):

    if not user.is_admin:
        return make_response('Only administrators can delete a course.', 401)
    
    course = db.session.query(Course).get(id)
    if course is None:
        return make_response('Course not found', 404)
    
    db.session.delete(course)
    db.session.commit()

    return make_response('Course deleted', 200)



def get_course(id):
    course = db.session.query(Course).get(id)
    if course is None:
        return make_response('Course not found.', 404)
    return make_response(course.to_dict(), 200)


@app.route('/api/v1/course', methods=['POST'])
def route_post_course():
    return create_course()

@app.route('/api/v1/course/<id>', methods=['GET', 'PUT', 'DELETE'])
def route_course(id):

    if request.method == 'GET':
        return get_course(id)

    elif request.method == 'PUT':
        return modify_course(id)

    elif request.method == 'DELETE':
        return delete_course(id)


@app.route('/api/v1/courses')
def route_get_all_courses():
    courses = db.session.query(Course).all()
    output = []
    for course in courses:
        output.append(course.to_dict())

    return make_response(jsonify(output), 200)

@app.route('/api/v1/courses/user/<user_id>')
def route_get_courses_by_user_id(user_id):

    output = []

    course_enrollments = db.session.query(CourseEnrollment).filter(CourseEnrollment.user_id==user_id).all()

    for enrollment in course_enrollments:
        course = enrollment.course.to_dict()
        course['role'] = enrollment.role.value
        output.append(course)

    return make_response(jsonify(output), 200)
