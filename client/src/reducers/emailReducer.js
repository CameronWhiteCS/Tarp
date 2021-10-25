import { ADD_EMAIL, REMOVE_EMAIL } from 'actions/types.js'

export default (state = [], action) => {
    switch(action.type) {
        case ADD_EMAIL:
            return [...state, action.payload]
        default:
            return state
    }
};