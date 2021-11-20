from hci.globals import db
from hci.models import Message

class Email(Message):

    __mapper_args__ = {
        'polymorphic_identity':'EMAIL',
    }
