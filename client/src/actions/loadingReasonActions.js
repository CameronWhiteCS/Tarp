import { ADD_LOADING_REASON, REMOVE_LOADING_REASON } from 'actions/types.js'

export const addLoadingReason = (reason) => dispatch => {
    dispatch({
        type: ADD_LOADING_REASON,
        payload: reason
    })
}

export const removeLoadingReason = (reason) => dispatch => {
    dispatch({
        type: REMOVE_LOADING_REASON,
        payload: reason
    })
}




