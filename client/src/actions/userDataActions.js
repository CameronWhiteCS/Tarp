import { SET_USER_DATA } from 'actions/types';

export const setUserData = (userData) => dispatch => {
    dispatch({
        type: SET_USER_DATA,
        payload: userData
    })
}