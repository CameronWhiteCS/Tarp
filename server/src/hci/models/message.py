from hci.globals import db

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    author = db.relationship('User')
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))
    course = db.relationship('Course')
    content = db.Column(db.String(1024), nullable=False, default='')
    is_read = db.Column(db.Boolean, nullable=False, default=False)
    is_automated = db.Column(db.Boolean, nullable=False, default=False)
    is_deleted = db.Column(db.Boolean, nullable=False, default=False)
    is_favorited = db.Column(db.Boolean, nullable=False, default=False)
    type = db.Column(db.String(50))

    __mapper_args__ = {
        'polymorphic_identity':'MESSAGE',
        'polymorphic_on': type
    }


    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'author': self.author.to_dict(),
            'course': self.course.to_dict(),
            'isRead': self.is_read,
            'isAutomated': self.is_automated,
            'isDeleted': self.is_deleted,
            'isFavorited': self.is_favorited,
            'type': self.type
        }