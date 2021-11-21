import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'

import { ReactComponent as IconEdit } from 'res/icon/edit.svg'
import { ReactComponent as IconLayers } from 'res/icon/layers.svg'
import { ReactComponent as IconExternalLink } from 'res/icon/external-link.svg'
import { ReactComponent as IconSend } from 'res/icon/send.svg'
import { ReactComponent as IconVolume } from 'res/icon/volume.svg'
import { ReactComponent as IconMail } from 'res/icon/mail.svg'
import { ReactComponent as IconMessageSquare } from 'res/icon/message-square.svg'
import { ReactComponent as IconStar } from 'res/icon/star.svg'
import { ReactComponent as IconTrash } from 'res/icon/trash-2.svg'
import { ReactComponent as IconLouOut } from 'res/icon/log-out.svg'
import { ReactComponent as IconEye } from 'res/icon/eye.svg'
import { ReactComponent as IconBook } from 'res/icon/book.svg'
import { ReactComponent as IconBookOpen } from 'res/icon/book-open.svg'

import { ReactComponent as IconCheck } from 'res/icon/check.svg'

import './ribbon.css'
import { addError } from 'actions/errorActions';

import axios from 'axios';
import { addConfirmationDialogue } from 'actions/confirmationDialogueActions';
import ConfirmationDialogue from 'classes/ConfirmationDialogue';
import { ModalDialog } from 'react-bootstrap';

/**
 * 
 * @param {*} props
 * @param {array} props.messages Message objects stored in 
 * @param {func} props.setMessages Set the message objects of the parent component
 * @param {*} props.filterState
 * @param {func} props.applyFilters
 * @returns 
 */
const Ribbon = (props) => {

    const filterState = props.filterState;

    /** Perform some operation on a filtered list of messages,
     * and then take the modified filtered list and
     * merge it back into the main list.  */
    const mergeMessageArrays = (filteredMessages) => {

        const output = [...props.messages];

        for(let i = 0; i < filteredMessages.length; i++) {
            const filteredMessage = filteredMessages[i];

            for(let j = 0; j < output; j++) {
                if(output[j].id === filteredMessage.id) {
                    output[j] = filteredMessage;
                    break;
                }
            }

        }

        props.setMessages(output.filter(msg => !msg.deleteForever));

    }

    const markAllAsRead = () => {

        const filteredMessages = props.applyFilters([...props.messages]);

        filteredMessages.forEach(msg => {
            if (msg.isRead === false) {
                axios.put(`/api/v1/message/${msg.id}`, {isRead: true})
                    .catch(err => {
                        addError(err.response.data)(props.dispatch);
                    })
                msg.isRead = true;
            }
        })

        mergeMessageArrays(filteredMessages);
    }

    const deleteAllMessages = () => {

        const filteredMessages = props.applyFilters([...props.messages]);

        filteredMessages.forEach(msg => {
            if (msg.isDeleted === true) {
                axios.delete(`/api/v1/message/${msg.id}`)
                    .catch(err => {
                        addError(err.response.data)(props.dispatch);
                    })
                msg.deleteForever = true;
            } else {

                axios.put(`/api/v1/message/${msg.id}`, {isDeleted: true})
                .catch(err => {
                    addError(err.response.data)(props.dispatch)
                })

                msg.isDeleted = true;
            }
        })

        mergeMessageArrays(filteredMessages);

    }

    return (
        <div id="ribbon">

            {
                /**
                 * <div className='ribbon-component'>
                <div style={{ color: "#084B81" }}>MAIL BOX</div>
                <div className='ribbon-section'>
                    <div className='ribbon-item'>
                        <IconEdit />
                        Compose
                    </div>
                </div>
            </div>
                 */
            }

            <div className='ribbon-component'>
                <div>MAIL BOX</div>
                <div className='ribbon-section'>

                    <div
                        className={`ribbon-item ${filterState.readUnread === 'ALL' ? 'selected' : ''}`}
                        onClick={() => props.setFilterState({
                            ...filterState,
                            readUnread: 'ALL'
                        })}
                    >
                        <IconLayers />
                        All
                    </div>

                    <div
                        className={`ribbon-item ${filterState.readUnread === 'UNREAD' ? 'selected' : ''}`}
                        onClick={() => props.setFilterState({
                            ...filterState,
                            readUnread: 'UNREAD'
                        })}
                    >
                        <IconBook />
                        Unread
                    </div>


                    <div
                        className={`ribbon-item ${filterState.readUnread === 'READ' ? 'selected' : ''}`}
                        onClick={() => props.setFilterState({
                            ...filterState,
                            readUnread: 'READ'
                        })}
                    >
                        <IconBookOpen />
                        Read
                    </div>

                    {
                        /**
                         * <div className='ribbon-item'>
                        <IconSend  />
                        Sent
                    </div>
                         */
                    }

                </div>
                &nbsp;
            </div>

            <div className='ribbon-component'>
                MESSAGE TYPE

                <div className={`ribbon-section`}>

                    <div
                        className={`ribbon-item ${filterState.messageType === 'ALL' ? 'selected' : ''}`}
                        onClick={() => props.setFilterState({
                            ...filterState,
                            messageType: 'ALL'
                        })}
                    >
                        <IconLayers />
                        All
                    </div>

                    <div
                        className={`ribbon-item ${filterState.messageType === 'ANNOUNCEMENTS' ? 'selected' : ''}`}
                        onClick={() => props.setFilterState({
                            ...filterState,
                            messageType: 'ANNOUNCEMENTS'
                        })}
                    >
                        <IconVolume />
                        Announce.
                    </div>

                    <div
                        className={`ribbon-item ${filterState.messageType === 'DISCUSSIONS' ? 'selected' : ''}`}
                        onClick={() => props.setFilterState({
                            ...filterState,
                            messageType: 'DISCUSSIONS'
                        })}
                    >
                        <IconMessageSquare />
                        Discussions
                    </div>

                    <div
                        className={`ribbon-item ${filterState.messageType === 'EMAILS' ? 'selected' : ''}`}
                        onClick={() => props.setFilterState({
                            ...filterState,
                            messageType: 'EMAILS'
                        })}
                    >
                        <IconMail />
                        Emails
                    </div>

                </div>
            </div>


            <div className='ribbon-component'>
                SHOW
                <div className='ribbon-section'>


                    <div
                        className={`ribbon-item ${filterState.showOnly === 'ALL' ? 'selected' : ''}`}
                        onClick={() => props.setFilterState({
                            ...filterState,
                            showOnly: 'ALL'
                        })}
                    >
                        <IconLayers />
                        All but trash
                    </div>

                    <div
                        className={`ribbon-item ${filterState.showOnly === 'MARKED' ? 'selected' : ''}`}
                        onClick={() => props.setFilterState({
                            ...filterState,
                            showOnly: 'MARKED'
                        })}
                    >
                        <IconStar />
                        Favorited only
                    </div>

                    <div
                        className={`ribbon-item ${filterState.showOnly === 'TRASH' ? 'selected' : ''}`}
                        onClick={() => props.setFilterState({
                            ...filterState,
                            showOnly: 'TRASH'
                        })}
                    >
                        <IconTrash />
                        Trash only
                    </div>

                    <div
                        className={`ribbon-item ${filterState.showOnly === 'AUTO' ? 'selected' : ''}`}
                        onClick={() => props.setFilterState({
                            ...filterState,
                            showOnly: 'AUTO'
                        })}
                    >
                        <IconLouOut />
                        Automated only
                    </div>
                </div>
            </div>

            <div className='ribbon-component'>
                <div >&nbsp;</div>
                <div className='ribbon-section'>
                    <div className='ribbon-item' onClick={markAllAsRead}>
                        <IconCheck />
                        Mark all as read
                    </div>
                </div>
            </div>

            <div className='ribbon-component'>
                <div>&nbsp;</div>
                <div className='ribbon-section'>
                    <div className='ribbon-item' onClick={() => {
                        addConfirmationDialogue(new ConfirmationDialogue(
                            'Delete all messages?',
                            filterState.showOnly === 'TRASH' ? 'Are you sure you wish to permanently delete all currently viewable messages? ' : 'Are you sure you wish to move all currently viewable messages to the trash? ',
                            deleteAllMessages,
                            () => { },
                            'Yes, I\'m sure',
                            'No, go back!'
                        ))(props.dispatch)
                    }}>
                        <IconTrash />
                        Delete all
                    </div>
                </div>
            </div>

        </div >
    )
}

const mapStateToProps = (state) => ({
    ribbonState: state.ribbonState
})

export default connect(mapStateToProps)(Ribbon);