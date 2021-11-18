from hci.globals import db

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    code = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1024), nullable=False)
    enrollments = db.relationship('CourseEnrollment', cascade='all,delete', backref='course')
    professor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    professor = db.relationship('User')

    def to_dict(self):

        return {
            'id': self.id,
            'title': self.title,
            'code': self.code,
            'description': self.description,
            'professorName': f'{self.professor.first_name} {self.professor.last_name}'
        }
