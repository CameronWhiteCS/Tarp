import { SET_RIBBON_STATE } from 'actions/types'

export const setRibbonState = (ribbonState) => dispatch => dispatch({
    action: SET_RIBBON_STATE,
    payload: ribbonState
})