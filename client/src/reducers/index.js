import { combineReducers } from 'redux';
import emailReducer from './emailReducer';
import errorReducer from './errorReducer';
import userDataReducer from './userDataReducer';
import loadingReasonReducer from './loadingReasonReducer'

export default combineReducers({
    emails: emailReducer,
    errors: errorReducer,
    userData: userDataReducer,
    loadingReasons: loadingReasonReducer
    //announcements: announcementReducers,
    //courses: courseReducer,
    //discussionBoardMessages: discussionBoardMessageReducer,
    //discussionBoards: discussionBoardReducer,
});