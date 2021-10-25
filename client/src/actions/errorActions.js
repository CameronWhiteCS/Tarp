import { ADD_ERROR, REMOVE_ERROR } from 'actions/types.js'

export const addError = (error) => dispatch => {
    dispatch({
        type: ADD_ERROR,
        payload: error
    })
}

export const removeError = () => dispatch => {
    dispatch({
        type: REMOVE_ERROR
    })
}




