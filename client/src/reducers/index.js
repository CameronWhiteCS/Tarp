import { combineReducers } from 'redux';
import emailReducer from './emailReducer';
import errorReducer from './errorReducer';
import userDataReducer from './userDataReducer';
import loadingReasonReducer from './loadingReasonReducer'
import courseReducer from './courseReducer'
import confirmationDialogueReducer from './confirmationDialogueReducer'

export default combineReducers({
    emails: emailReducer,
    errors: errorReducer,
    userData: userDataReducer,
    loadingReasons: loadingReasonReducer,
    courses: courseReducer,
    confirmationDialogues: confirmationDialogueReducer,
    //announcements: announcementReducers,
    //courses: courseReducer,
    //discussionBoardMessages: discussionBoardMessageReducer,
    //discussionBoards: discussionBoardReducer,
});