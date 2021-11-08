import { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { addLoadingReason, removeLoadingReason } from 'actions/loadingReasonActions';
import { setCourses } from 'actions/courseActions';
import { addError } from 'actions/errorActions';

const Course = (props) => {
    return (
        <>
            <div key={`course-tile-${props.course.id}`}>
                <p><b>{props.course.title}</b></p>
                <p>{props.course.code}</p>
                <p>{props.course.description}</p>
            </div>
            <hr />
        </>
    )
}

const Courses = (props) => {

    useEffect(() => {

        const loadingReason = 'Fetching courses...';

        addLoadingReason(loadingReason)(props.dispatch);

        axios.get(`/api/v1/courses/user/${props?.userData?.id}`)
            .then(res => {
                setCourses(res.data)(props.dispatch)
            })
            .catch(err => {
                addError(err.response.data)(props.dispatch)
            })
            .finally(() => {
                removeLoadingReason(loadingReason)(props.dispatch)
            })

    }, [])

    return (
        <>
            <h1>Your Courses</h1>
            {
                props.courses.map(course => <Course course={course} />)
            }
        </>
    )
}

const mapStateToProps = state => ({
    courses: state.courses,
    userData: state.userData
})

export default connect(mapStateToProps)(Courses);