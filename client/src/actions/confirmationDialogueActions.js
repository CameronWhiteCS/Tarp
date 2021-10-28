import { ADD_CONFIRMATION_DIALOGUE, REMOVE_CONFIRMATION_DIALOGUE } from 'actions/types.js'

/**
 * 
 * @param {ConfirmationDialogue} confirmationDialogue 
 * @returns 
 */
export const addConfirmationDialogue = (confirmationDialogue) => dispatch => {
    dispatch({
        type: ADD_CONFIRMATION_DIALOGUE,
        payload: confirmationDialogue
    })
}

/**
 * 
 * @param {ConfirmationDialogue} confirmationDialogue 
 * @returns 
 */
export const removeConfirmationDialogue = (confirmationDialogue) => dispatch => {
    dispatch({
        type: REMOVE_CONFIRMATION_DIALOGUE,
        payload: confirmationDialogue
    })
}




