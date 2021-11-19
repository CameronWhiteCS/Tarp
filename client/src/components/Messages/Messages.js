import { connect } from 'react-redux'
import { useState } from 'react';

import TarpGrid from 'components/TarpGrid';
import TarpGridItem from 'components/TarpGridItem';
import { useEffect } from 'react';
import axios from 'axios';
import { addLoadingReason, removeLoadingReason } from 'actions/loadingReasonActions';
import { addError } from 'actions/errorActions';

import Ribbon from 'components/Ribbon';

import moment from 'moment-timezone'

const Messages = (props) => {

    const [messages, setMessages] = useState([]);

    const init = () => {

        const loadingReason = 'Fetching messages...';
        addLoadingReason(loadingReason)(props.dispatch)

        axios.get('/api/v1/messages')
            .then(res => {
                setMessages(res.data);
            })
            .catch(err => {
                addError(err.response?.data)(props.dispatch)
            })
            .finally(() => {
                removeLoadingReason(loadingReason)(props.dispatch)
            })
    }

    useEffect(init, [])

    const favoriteMessage = message => {

        axios.put(`/api/v1/message/${message.id}`, { isFavorited: !message.isFavorited })
            .catch(err => {
                addError(err.response.error)(props.dispatch)
            })
            .finally(() => {

                const newMessages = [...messages];

                for (let i = 0; i < newMessages.length; i++) {
                    if (newMessages[i].id === message.id) {
                        newMessages[i].isFavorited = !message.isFavorited;
                        break;
                    }
                }

                setMessages(newMessages);

            });

    }

    const deleteMessage = message => {

        if (message.isDeleted) {
            axios.delete(`/api/v1/message/${message.id}`)
                .then(() => {
                    setMessages(messages.filter(msg => msg.id !== message.id));
                })
                .catch(err => {
                    addError(err.response.data)(props.dispatch);
                })
        } else {

            axios.put(`/api/v1/message/${message.id}`, { isDeleted: true })
                .catch(err => {
                    addError(err.response.error)(props.dispatch)
                })
                .finally(() => {

                    const newMessages = [...messages];

                    for (let i = 0; i < newMessages.length; i++) {
                        if (newMessages[i].id === message.id) {
                            newMessages[i].isDeleted = true;
                            break;
                        }
                    }

                    setMessages(newMessages);

                });

        }


    }

    const getHeaderColor = msg => {
        if(msg.type === 'EMAIL') {
            return '#084b81'
        } else if (msg.type === 'DISCUSSION_BOARD_POST') {
            return 'black';
        } else {
            return '#27ae60'
        }
    }

    const getFormattedMessageType = msg => {
        if(msg.type === 'EMAIL') {
            return 'email'
        } else if (msg.type === 'DISCUSSION_BOARD_POST') {
            return 'Discussion'
        } else if (msg.type === 'ANNOUNCEMENT') {
            return 'Announcement';
        } else {
            return 'Undefined message type'
        }

    }

    const getFormattedDate = msg => {
        return moment(new Date(msg.createdAt)).tz('America/New_York').format('MM/DD/YYYY hh:mm')
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Ribbon />
            <TarpGrid>
                {
                    messages.map(message => {
                        return (
                            <TarpGridItem
                                title={getFormattedMessageType(message)}
                                authorName={`${message.author?.firstName} ${message.author?.lastName}`}
                                courseCode={message.course?.code}
                                date={getFormattedDate(message)}
                                onDelete={() => deleteMessage(message)}
                                onSelect={() => favoriteMessage(message)}
                                content={message.content}
                                subtitle={message.title}
                                selected={message.isFavorited}
                                headerColor={getHeaderColor(message)}
                            />
                        )
                    })
                }
            </TarpGrid>
        </div>
    );

}

const mapStateToProps = state => ({
    messages: state.messages
})

export default connect(mapStateToProps)(Messages);