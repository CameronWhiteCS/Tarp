from hci.globals import db

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    code = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1024), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'code': self.code,
            'description': self.description
        }
