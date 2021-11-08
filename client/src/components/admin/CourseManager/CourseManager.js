import axios from 'axios'
import { connect } from 'react-redux'
import { addLoadingReason, removeLoadingReason } from 'actions/loadingReasonActions'
import { setCourses, removeCourse } from 'actions/courseActions'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { addConfirmationDialogue } from 'actions/confirmationDialogueActions'
import ConfirmationDialogue from 'classes/ConfirmationDialogue'
import { addError } from 'actions/errorActions'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import EnrollUser from 'components/admin/CourseManager/EnrollUser.js';

const CourseManager = (props) => {

    const history = useHistory();
    const [selectedCourse, setSelectedCourse] = useState(undefined);

    const fetchCourses = () => {

        const loadingReason = 'Fetching courses...'

        axios.get('/api/v1/courses')
            .then((res) => {
                setCourses(res.data)(props.dispatch)
            })
            .catch((err) => {

            })
            .finally(() => {
                removeLoadingReason(loadingReason)(props.dispatch)
            })
    }

    const deleteCourse = (course) => {

        const loadingReason = 'Deleting course...';

        addLoadingReason(loadingReason)(props.dispatch);

        axios.delete(`/api/v1/course/${course.id}`)
        .then((res) => {
            removeCourse(course)(props.dispatch)
        })
        .catch((err) => {
            addError(err.response.data);
        })
        .finally(() => {
            removeLoadingReason(loadingReason)(props.dispatch);
        })

    }

    const promptDeleteCourse = (course) => {
        const confirmationDialogue = new ConfirmationDialogue(
            `Delete ${course.title}?`,
            'This action cannot be undone -- are you sure you wish to continue?',
            () => deleteCourse(course),
            () => {},
            'Delete',
            'Cancel'
            );
        addConfirmationDialogue(confirmationDialogue)(props.dispatch);
    }

    useEffect(fetchCourses, [])

    return (
        <>
            <EnrollUser
                course={selectedCourse}
                setCourse={setSelectedCourse}
            />
            <h1>Course Manager</h1>
            <Link to="/admin/courses/create">Create a course</Link>
            <hr />
            {
                props.courses && props.courses.map((course) => {
                    return (
                        <div key={`course-${course.id}`}>
                            <p><b>{course.title}</b></p>
                            <p>{course.code}</p>
                            <p>{course.description}</p>

                            <Button
                                variant="primary"
                                onClick={() => history.push(`/admin/courses/edit/${course.id}`)}
                            >
                                Edit
                            </Button>

                            &nbsp;

                            <Button
                                variant="secondary"
                                onClick={() => setSelectedCourse(course)}
                            >
                                Enroll Student
                            </Button>

                            &nbsp;

                            <Button
                                variant="danger"
                                onClick={() => promptDeleteCourse(course)}
                            >
                                Delete
                            </Button>

                            <hr />
                        </div>
                    )
                })
            }
        </>
    )

}

const mapStateToProps = state => ({
    courses: state.courses
})

export default connect(mapStateToProps)(CourseManager);