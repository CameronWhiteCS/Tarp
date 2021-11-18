import { SET_RIBBON_STATE } from 'actions/types.js'

export default (state  = [], action) => {

    switch (action.type) {
        case SET_RIBBON_STATE: {
            return action.payload;
        }
        default:
            return state
    }
};

