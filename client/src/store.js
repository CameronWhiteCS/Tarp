import { createStore } from 'redux'
import rootReducer from 'reducers'

const initialState = {
    emails: [],
    notifications: [],
    userData: {
        id: undefined,
        isAdmin: false
    },
    loadingReasons: []
}

const store = createStore(rootReducer, initialState)

export default store