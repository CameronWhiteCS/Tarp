import enum
from hci.globals import db

class CourseRole(enum.Enum):
    STUDENT = 'Student'
    PROFESSOR = 'Professor'

class CourseEnrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)

