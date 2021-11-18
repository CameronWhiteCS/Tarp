from hci.globals import db
from hci.models import Message

class Email(Message):

    title = db.Column(db.String(255))

    def to_dict(self):
        output = super().to_dict()
        output['title'] = self.title
        return output

    __mapper_args__ = {
        'polymorphic_identity':'EMAIL',
    }
