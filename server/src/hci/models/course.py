from . import db

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)