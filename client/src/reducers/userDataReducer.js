import { SET_USER_DATA } from 'actions/types.js'

const initialState = {
    id: undefined,
    isAdmin: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        default:
            return state
    }
};