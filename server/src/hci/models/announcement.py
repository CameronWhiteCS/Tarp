from hci.globals import db
from hci.models import Message

class Announcement(Message):

    __mapper_args__ = {
        'polymorphic_identity':'ANNOUNCEMENT',
    }