
import { SET_COURSES, ADD_COURSE, REMOVE_COURSE } from 'actions/types.js'

export const addCourse = (course) => dispatch => dispatch({
    action: ADD_COURSE,
    payload: course
})

export const removeCourse = (course) => dispatch => dispatch({
    type: REMOVE_COURSE,
    payload: course
})

export const setCourses = (courses) => dispatch => dispatch({
    type: SET_COURSES,
    payload: courses
})