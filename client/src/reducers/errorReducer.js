import { ADD_ERROR, REMOVE_ERROR } from 'actions/types.js'

export default (state  = [], action) => {

    switch (action.type) {
        case ADD_ERROR: {
            const newErrors = [...state]
            newErrors.push(action.payload);
            return newErrors;
        }
        case REMOVE_ERROR: {
            const newErrors = [...state]
            newErrors.shift();
            return newErrors;
        }
        default:
            return state
    }
};