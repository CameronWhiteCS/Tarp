import { connect } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { removeLoadingReason } from 'actions/loadingReasonActions';
import axios from 'axios';
import { addError } from 'actions/errorActions';
import { useHistory } from 'react-router-dom';

/**
 * 
 * @param {*} props
 * @param {int} [props.id] ID of course being edited
 * @returns 
 */
const CreateCourse = (props) => {

    const history = useHistory();

    let initialValues = {
        title: '',
        code: '',
        description: ''
    }


    const onSubmit = values => {
        const loadingReason = 'Creating course...';

        axios.post('/api/v1/course', values)
            .catch(err => {
                addError(err.response.data)(props.dispatch)
            })
            .finally(() => {
                removeLoadingReason(loadingReason)(props.dispatch)
                alert('Course created');
                history.push('/admin/courses')

            })
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required().max(255),
        code: yup.string().required().max(255),
        description: yup.string().required().max(1024)
    });

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <h1>Create a course</h1>

                <Form.Group>
                    <Row>
                        <Col sm={12} md={6} lg={3}>
                            <Form.Label htmlFor="title">
                                Course title:
                            </Form.Label>
                        </Col>
                        <Col sm={12} md={6} lg={9}>
                            <Form.Control
                                name="title"
                                id="title"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                            />



                        </Col>
                    </Row>
                    {formik.errors.title && formik.touched.title &&
                        <p className="text-danger">{formik.errors.title}</p>
                    }
                </Form.Group>

                <br />                <Form.Group>
                    <Row>
                        <Col sm={12} md={6} lg={3}>
                            <Form.Label htmlFor="code">
                                Course code:
                            </Form.Label>
                        </Col>
                        <Col sm={12} md={6} lg={9}>
                            <Form.Control
                                name="code"
                                id="code"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.code}
                            />
                        </Col>
                    </Row>
                    {formik.errors.code && formik.touched.code &&
                        <p className="text-danger">{formik.errors.code}</p>
                    }
                </Form.Group>

                <br />

                <Form.Group>
                    <Row>
                        <Col sm={12} md={6} lg={3}>
                            <Form.Label htmlFor="description">
                                Course description:
                            </Form.Label>
                        </Col>
                        <Col sm={12} md={6} lg={9}>
                            <textarea
                                className="form-control"
                                name="description"
                                id="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                            />
                        </Col>
                    </Row>
                    {formik.errors.description && formik.touched.description &&
                        <p className="text-danger">{formik.errors.description}</p>
                    }
                </Form.Group>

                <br />

                <Button
                    disabled={Object.keys(formik.errors).length > 0}
                    type='submit'
                >
                    Create course
                </Button>

            </Form>
        </>
    );

}

const mapStateToProps = state => ({
    courses: state.courses
})

export default connect(mapStateToProps)(CreateCourse);