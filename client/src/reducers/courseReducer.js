import { SET_COURSES, ADD_COURSE, REMOVE_COURSE } from 'actions/types.js'

export default (state  = [], action) => {

    switch (action.type) {
        case SET_COURSES: {
            return action.payload;
        }
        case ADD_COURSE: {
            const newState = [...state];
            newState.push(action.payload);
            return newState;
        }
        case REMOVE_COURSE: {
            return state.filter(element => element.id != action.payload.id)
        }
        default:
            return state
    }
};