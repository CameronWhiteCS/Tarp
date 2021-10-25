import { useFormik } from 'formik'
import * as yup from 'yup';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { addError } from 'actions/errorActions'
import { addLoadingReason, removeLoadingReason } from 'actions/loadingReasonActions'

const SignUp = (props) => {

    const LOADING_REASON = 'Creating your account...'

    const history = useHistory();

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    }

    const onSubmit = values => {

        addLoadingReason(LOADING_REASON)(props.dispatch);

        axios.post('/api/v1/user', values)
            .then(res => {

                history.push('/')
            })
            .catch(err => {
                addError(err.response.data)(props.dispatch)
            })
            .finally(() => {
                removeLoadingReason(LOADING_REASON)(props.dispatch);
            })
    }

    const validationSchema = yup.object().shape({
        firstName: yup.string().required('Your first name is required'),
        lastName: yup.string().required('Your last name is required'),
        email: yup.string().email('Invalid email format').required('Your email is required to sign up'),
        password: yup.string().required(),
        passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Your passwords must match')

    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    })



    return (

        <>
            <Form onSubmit={formik.handleSubmit}>
                <h1>Create Account</h1>

                <Form.Group>

                    <Row>
                        <Col sm={12} md={6}>
                            <Form.Label htmlFor="firstName">First name:</Form.Label>
                        </Col>
                        <Col sm={12} md={6}>

                            <Form.Control
                                type="text"
                                name="firstName"
                                id="firstName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                            </Form.Control>
                        </Col>

                    </Row>

                    {formik.touched.firstName && formik.errors.firstName &&
                        <Form.Text className="text-danger">
                            {formik.errors.firstName}
                        </Form.Text>
                    }

                </Form.Group>

                <br />

                <Form.Group>

                    <Row>
                        <Col sm={12} md={6}>
                            <Form.Label htmlFor="lastName">Last name:</Form.Label>
                        </Col>
                        <Col sm={12} md={6}>

                            <Form.Control
                                type="text"
                                name="lastName"
                                id="lastName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                            </Form.Control>
                        </Col>

                    </Row>

                    {formik.touched.lastName && formik.errors.lastName &&
                        <Form.Text className="text-danger">
                            {formik.errors.lastName}
                        </Form.Text>
                    }

                </Form.Group>

                <br />

                <Form.Group>

                    <Row>
                        <Col sm={12} md={6}>
                            <Form.Label htmlFor="email">Email address:</Form.Label>
                        </Col>
                        <Col sm={12} md={6}>

                            <Form.Control
                                type="text"
                                name="email"
                                id="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                            </Form.Control>
                        </Col>

                    </Row>

                    {formik.touched.email && formik.errors.email &&
                        <Form.Text className="text-danger">
                            {formik.errors.email}
                        </Form.Text>
                    }

                </Form.Group>

                <br />

                <Form.Group>

                    <Row>
                        <Col sm={12} md={6}>
                            <Form.Label htmlFor="password">Password:</Form.Label>
                        </Col>
                        <Col sm={12} md={6}>

                            <Form.Control
                                type="password"
                                name="password"
                                id="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                            </Form.Control>
                        </Col>

                    </Row>

                    {formik.touched.password && formik.errors.password &&
                        <Form.Text className="text-danger">
                            {formik.errors.password}
                        </Form.Text>
                    }

                </Form.Group>

                <br />

                <Form.Group>

                    <Row>
                        <Col sm={12} md={6}>
                            <Form.Label htmlFor="passwordConfirm">Confirm password:</Form.Label>
                        </Col>
                        <Col sm={12} md={6}>

                            <Form.Control
                                type="password"
                                name="passwordConfirm"
                                id="passwordConfirm"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                            </Form.Control>
                        </Col>

                    </Row>

                    {formik.touched.passwordConfirm && formik.errors.passwordConfirm &&
                        <Form.Text className="text-danger">
                            {formik.errors.passwordConfirm}
                        </Form.Text>
                    }

                </Form.Group>

                <br />

                <Button
                    type="submit"
                    varaint="primary"
                    disabled={Object.keys(formik.errors).length > 0}
                >
                    Create account
                </Button>

            </Form>
        </>

    );

}
export default connect()(SignUp);