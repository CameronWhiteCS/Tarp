const emptyFunc = () => {

}

/**
 * Abstract representation of the data stored inside of a confirmation dialogue.
 */
class ConfirmationDialogue {

    /**
     * 
     * @param {string} title Title displayed at the top of the confirmation modal
     * @param {string} prompt The main prompt of the modal
     * @param {func} onAccept Function to run when the confirm button is pressed
     * @param {func} onDecline Function to run when the decline or exit button is pressed
     * @param {string} acceptButtonText The text of the "accept" or "confirm" button. Defaults to 'accept'
     * @param {string} rejectbuttonText The text of the "reject" or "decline" button. Defaults to 'reject'
     * 
     */
    constructor(title, prompt, onAccept = emptyFunc, onDecline = emptyFunc, acceptButtonText = '', rejectbuttonText = ''){
        this.title = title;
        this.prompt = prompt;
        this.onAccept = onAccept;
        this.onDecline = onDecline;
        this.acceptButtonText = acceptButtonText;
        this.rejectbuttonText = rejectbuttonText;
    }
}

export default ConfirmationDialogue;