import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { REMOVE_ERROR } from 'actions/types'

const Errors = (props) => {

    const isVisible = props.errors.length > 0;

    const dismissItem = () => {
        props.dispatch({
            type: REMOVE_ERROR
        })
    }

    return (
        <Modal show={isVisible} onHide={dismissItem}>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.errors[0]}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={dismissItem}>
                    Dismiss
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps)(Errors)