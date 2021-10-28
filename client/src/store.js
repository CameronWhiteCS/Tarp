import { createStore } from 'redux'
import rootReducer from 'reducers'

const initialState = {
    emails: [],
    notifications: [],
    errors: [],
    userData: {

    },
    loadingReasons: [],
    courses: [],
    confirmationDialogues: []
}

const store = createStore(rootReducer, initialState)

export default store