import { ADD_LOADING_REASON, REMOVE_LOADING_REASON } from 'actions/types.js'

export default (state  = [], action) => {

    switch (action.type) {
        case ADD_LOADING_REASON: {
            const newLoadingReasons = [...state]
            newLoadingReasons.push(action.payload);
            return newLoadingReasons;
        }
        case REMOVE_LOADING_REASON: {
            return state.filter(element => element !== action.payload)
        }
        default:
            return state
    }
};