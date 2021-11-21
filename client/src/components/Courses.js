import { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { addLoadingReason, removeLoadingReason } from 'actions/loadingReasonActions';
import { setCourses } from 'actions/courseActions';
import { addError } from 'actions/errorActions';

import { Link } from 'react-router-dom'
import TarpGrid from './TarpGrid';
import TarpGridItem from './TarpGridItem';

const Course = (props) => {
    return (
        <>
            <div key={`course-tile-${props.course.id}`}>
                <p>
                    <Link to={`/messages/course/${props.course.id}`}>
                        <b>{props.course.title}</b>
                    </Link>
                </p>
                <p>{props.course.code}</p>
                <p>{props.course.description}</p>
            </div>
            <hr />
        </>
    )
}

const Courses = (props) => {

    useEffect(() => {

        if(props.userData?.id === undefined) return;

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

    }, [props.userData?.id])

    return (
        <>
            <TarpGrid>
                {
                    props.courses.map(course => 
                        <TarpGridItem
                            title={<Link to={`/messages/course/${course.id}`}>{course.title}</Link>}
                            content={course.description}
                            iconName='book'
                            authorName={course.professorName}
                            courseCode={course.code}
                            hideRead
                        /> 
                    )
                }
            </TarpGrid>
        </>
    )
}

const mapStateToProps = state => ({
    courses: state.courses,
    userData: state.userData
})

export default connect(mapStateToProps)(Courses);