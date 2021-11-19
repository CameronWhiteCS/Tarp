import { connect } from 'react-redux'
import { useState } from 'react';
import './style.css'

import TarpGrid from 'components/TarpGrid';
import TarpGridItem from 'components/TarpGridItem';
import { useEffect } from 'react';
import axios from 'axios';
import { addLoadingReason, removeLoadingReason } from 'actions/loadingReasonActions';
import { addError } from 'actions/errorActions';

import Ribbon from 'components/Ribbon';

const Messages = (props) => {

    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    const init = () => {

        const loadingReason = 'Fetching messages...';
        addLoadingReason(loadingReason)(props.dispatch)

        axios.get('/api/v1/messages')
            .then(res => {
                setMessages(res.data);
            })
            .catch(err => {
                addError(err.response.data)(props.dispatch)
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

    const messageToText = msg => {

        let output = '';

        const keys = Object.keys(msg);
        keys.forEach(key => {
            output += msg[key];
        })

        return output;
    }

    const filteredMessgaes = messages.filter(msg => {
        return messageToText(msg).toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Ribbon />

            <div>
                <input type="text" placeholder="Search Messages" onChange={event => { setSearchTerm(event.target.value) }} />
            </div>

            <TarpGrid>
                {
                    filteredMessgaes.map(message => {
                        return (
                            <TarpGridItem
                                title={'TITLE'}
                                authorName={'Author Name'}
                                courseCode={'SAH4096'}
                                date={'2021/11/1'}
                                onDelete={() => deleteMessage(message)}
                                onSelect={() => favoriteMessage(message)}
                                content={message.content}
                                subtitle={'Subtitle here'}
                                selected={message.isFavorited}
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