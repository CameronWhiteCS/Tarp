import { Row, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const AdminControlPanel = () => {

    const history = useHistory();

    return (
        <>
            <h1>Admin Control Panel</h1>
            <Row>
                <Col>
                    <Button onClick={() => history.push('/admin/courses')}>
                        Course Management
                    </Button>
                </Col>

                <Col>

                </Col>

                <Col>

                </Col>
            </Row>
        </>
    );

}

export default AdminControlPanel;