import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap'
import { removeConfirmationDialogue } from 'actions/confirmationDialogueActions';

const ConfirmationDialogues = (props) => {

    const confirmationDialogue = props.confirmationDialogues[0];

    if(!confirmationDialogue) return <></>

    const handleReject = () => {
        if(confirmationDialogue.onReject) confirmationDialogue.onReject();
        removeConfirmationDialogue()(props.dispatch)
    }

    const handleAccept = () => {
        if(confirmationDialogue.onAccept) confirmationDialogue.onAccept();
        removeConfirmationDialogue()(props.dispatch)
    }

    return (
        <Modal show={props.confirmationDialogues.length > 0} onHide={handleReject}>
            <Modal.Header closeButton>
                <Modal.Title>{confirmationDialogue.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{confirmationDialogue.prompt}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleAccept}>
                {confirmationDialogue.acceptButtonText || 'Accept'}
                </Button>
                <Button variant="primary" onClick={handleReject}>
                {confirmationDialogue.rejectButtonText || 'Reject'}
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

const mapStateToProps = state => ({
    confirmationDialogues: state.confirmationDialogues
})

export default connect(mapStateToProps)(ConfirmationDialogues);