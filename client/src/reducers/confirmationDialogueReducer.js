import { ADD_CONFIRMATION_DIALOGUE, REMOVE_CONFIRMATION_DIALOGUE } from 'actions/types.js'

export default (state  = [], action) => {

    switch (action.type) {
        case ADD_CONFIRMATION_DIALOGUE: {
            const newConfirmationDialogues = [...state]
            newConfirmationDialogues.push(action.payload);
            return newConfirmationDialogues;
        }
        case REMOVE_CONFIRMATION_DIALOGUE: {
            const newConfirmationDialogues = [...state]
            newConfirmationDialogues.shift();
            return newConfirmationDialogues;
        }
        default:
            return state
    }
};

