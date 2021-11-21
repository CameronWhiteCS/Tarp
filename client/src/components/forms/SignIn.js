import { useFormik } from 'formik';
import { Form, Button, Row, Col } from 'react-bootstrap';
import * as yup from 'yup';
import { connect } from 'react-redux'
import axios from 'axios';
import { addError } from 'actions/errorActions';
import { setUserData } from 'actions/userDataActions';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { addLoadingReason, removeLoadingReason } from 'actions/loadingReasonActions';

const SignIn = (props) => {

    const LOADING_REASON = 'Logging in...'

    const history = useHistory();

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email address').required('You must provide your email to log in'),
        password: yup.string().required('You must provide your password to log in')
    })

    const onSubmit = (values) => {

        addLoadingReason(LOADING_REASON)(props.dispatch)

        axios.post('/api/v1/signin', values)
            .then((res) => {
                setUserData(res.data)(props.dispatch)
                history.push('/messages')
            })
            .catch((err) => {
                addError(err.response.data)(props.dispatch)
            })
            .finally(() => {
                removeLoadingReason(LOADING_REASON)(props.dispatch);
            })
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <h1>Sign In</h1>
                <Form.Group>
                    <Row>
                        <Col sm={12} md={6} lg={3}>
                            <Form.Label htmlFor="email">
                                Email address:
                            </Form.Label>
                        </Col>
                        <Col sm={12} md={6} lg={9}>
                            <Form.Control
                                name="email"
                                id="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Col>
                    </Row>
                    <span className="text-danger">
                        {formik.touched.email && formik.errors.email}
                    </span>
                </Form.Group>

                <br />

                <Form.Group>
                    <Row>
                        <Col sm={12} md={6} lg={3}>
                            <Form.Label htmlFor="password">
                                Password:
                            </Form.Label>
                        </Col>
                        <Col sm={12} md={6} lg={9}>
                            <Form.Control
                                name="password"
                                id="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                            </Form.Control>
                        </Col>
                    </Row>
                    <span className="text-danger">
                        {formik.touched.password && formik.errors.password}
                    </span>
                </Form.Group>

                <br />

                <p className="text-muted">Don't have an account? Sign up <Link to='/signup'>here</Link>.</p>

                <Button
                    type="submit"
                    disabled={Object.keys(formik.errors).length > 0}
                >
                    Sign in
                </Button>


            </Form>
        </>

    );
}

export default connect()(SignIn);