import React from 'react';

import { connect } from 'react-redux';
import { addLoadingReason, removeLoadingReason } from 'actions/loadingReasonActions';
import { setCourses } from 'actions/courseActions';
import { addError } from 'actions/errorActions';

import axios from 'axios';

import './course_filter.css'

const CourseCard = props => {

    const { course, courseFilter, setCourseFilter } = props;



    return (
        <li key={`course-${course.id}`} className={`course ${course.code === courseFilter?.code ? 'course-active' : ''}`} onClick={e => {
            if (course.id === courseFilter?.id) {
                setCourseFilter(undefined);
            } else {
                setCourseFilter(course);
            }
        }}>
            <div className="code"> {course.code} </div>
            <div className="name"> {course.title} </div>
        </li>
    );
}

/**
 * 
 * @param {*} props 
 * @param {*} props.courseFilter Course object. If defined, only messages from that course will be displayed. 
 * @param {*} props.setCourseFilter 
 * @returns 
 */
const CourseFilter = (props) => {

    if (props.courses.length === 0 && props.userData?.id !== undefined) {

        const loadingReason = 'Fetching courses...';

        addLoadingReason(loadingReason)(props.dispatch);

        axios.get(`/api/v1/courses/user/${props.userData.id}`)
            .then(res => {
                setCourses(res.data)(props.dispatch)
            })
            .catch(err => {
                addError(err.response.data)(props.dispatch)
            })
            .finally(() => {
                removeLoadingReason(loadingReason)(props.dispatch)
            })
    }

    return (
        <div className="course-filter-card">
            <div className="title"> Filter by course </div>
            <ul className="course-list">
                {
                    props.courses.map(course => {
                        return (
                            <CourseCard
                                key={`couse-${course.id}`}
                                course={course}
                                courseFilter={props.courseFilter}
                                setCourseFilter={props.setCourseFilter}
                            />
                        )
                    })
                }
                <li className={`course ${props.courseFilter === undefined ? 'course-active' : ''}`} onClick={e => {
                    props.setCourseFilter(undefined)
                }}>
                    <div className="code">All Courses</div>
                    <div className="name"></div>
                </li>

            </ul>
        </div>
    );
}

const mapStateToProps = state => ({
    courses: state.courses,
    userData: state.userData
})

export default connect(mapStateToProps)(CourseFilter);