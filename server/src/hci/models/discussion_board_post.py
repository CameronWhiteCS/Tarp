from hci.globals import db
from hci.models import Message

class DiscussionBoardPost(Message):

    __mapper_args__ = {
        'polymorphic_identity':'DISCUSSION_BOARD_POST',
    }