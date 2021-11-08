from hci.globals import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)
    enrollments = db.relationship('CourseEnrollment', cascade='all,delete', backref='user')

    def __init__(self, first_name='', last_name='', email='', password_hash=''):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password_hash = password_hash

    def to_dict(self):

        return {
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'isAdmin': self.is_admin
        }
