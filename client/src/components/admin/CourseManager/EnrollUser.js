import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import * as yup from 'yup';
import { addLoadingReason, removeLoadingReason } from 'actions/loadingReasonActions';
import axios from 'axios';
import { addError } from 'actions/errorActions';

/**
 * 
 * @param {func} props.course
 * @param {func} props.setCourse
 * @returns 
 */
const EnrollUser = (props) => {

    const initialValues = {
        email: '',
        role: 'STUDENT'
    }

    const validationSchema = yup.object().shape({
        email: yup.string().email().required()
    })

    const onSubmit = (values) => {

        const loadingReason = 'Enrolling user...'

        const postData = { ...values };
        postData['courseId'] = props.course.id;

        addLoadingReason(loadingReason)(props.dispatch);

        axios.post(`/api/v1/enrollment`, postData)
            .then((res) => {
                closeForm()
                alert('User enrolled in course')
            })
            .catch((err) => {
                addError(err.response.data)(props.dispatch)
            })
            .finally(() => {
                removeLoadingReason(loadingReason)(props.dispatch);
            })

    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    const closeForm = () => {
        props.setCourse(undefined)
        formik.setValues({})
    }

    if (!props.course) return <></>

    return (
        <Modal show={props.course !== undefined} >
            <Modal.Header>
                <Modal.Title>Enroll User In {props.course.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
                    <Row>
                        <Col>
                            <Form.Label
                                htmlFor="email"
                            >
                                Email address:
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                name={'email'}
                                id={'email'}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Col>
                    </Row>
                    {formik.errors.email &&
                        <Row>
                            <Col>
                                <span className={'text-danger'}>{formik.errors.email}</span>
                            </Col>
                        </Row>
                    }

                    <br />

                    <Row>
                        <Col>
                            <Form.Label
                                htmlFor="role"
                            >
                                Role:
                            </Form.Label>
                        </Col>
                        <Col>
                            <select
                                id='role'
                                name='role'
                                className={'form-control'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.role}
                            >
                                <option value='PROFESSOR'>Professor</option>
                                <option value='STUDENT' defaultValue>Student</option>
                            </select>
                        </Col>
                    </Row>


                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={closeForm}
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    disabled={Object.keys(formik.errors).length > 0 || !formik.values.email}
                    onClick={() => formik.submitForm()}
                >

                    Enroll
                </Button>
            </Modal.Footer>
        </Modal>
    );

}


export default connect()(EnrollUser);