import { combineReducers } from 'redux';
import emailReducer from './emailReducer';
import errorReducer from './errorReducer';
import userDataReducer from './userDataReducer';
import loadingReasonReducer from './loadingReasonReducer'
import courseReducer from './courseReducer'
import confirmationDialogueReducer from './confirmationDialogueReducer'
import ribbonStateReducer from './ribbonStateReducer'

export default combineReducers({
    emails: emailReducer,
    errors: errorReducer,
    userData: userDataReducer,
    loadingReasons: loadingReasonReducer,
    courses: courseReducer,
    confirmationDialogues: confirmationDialogueReducer,
    ribbonState: ribbonStateReducer,

    //announcements: announcementReducers,
    //courses: courseReducer,
    //discussionBoardMessages: discussionBoardMessageReducer,
    //discussionBoards: discussionBoardReducer,
});