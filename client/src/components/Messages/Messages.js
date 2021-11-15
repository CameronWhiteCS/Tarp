import { connect } from 'react-redux'
import { useState } from 'react';
import './style.css'

import TarpGrid from 'components/TarpGrid';
import TarpGridItem from 'components/TarpGridItem';

const Messages = (props) => {

    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'email',
            content: '1',
            authorName: 'Cameron White',
            isRead: false,
            isBot: false,
            isDeleted: false,
            isFavorited: false,
        },
        {
            id: 2,
            type: 'email',
            content: '2',
            authorName: 'Cameron White',
            isRead: false,
            isBot: false,
            isDeleted: false,
            isFavorited: false,
        },
        {
            id: 3,
            type: 'email',
            content: '3',
            authorName: 'Cameron White',
            isRead: false,
            isBot: false,
            isDeleted: false,
            isFavorited: false,
        },
        {
            id: 1,
            type: 'email',
            content: '1',
            authorName: 'Cameron White',
            isRead: false,
            isBot: false,
            isDeleted: false,
            isFavorited: false,
        },
        {
            id: 2,
            type: 'email',
            content: '2',
            authorName: 'Cameron White',
            isRead: false,
            isBot: false,
            isDeleted: false,
            isFavorited: false,
        },
        {
            id: 3,
            type: 'email',
            content: '3',
            authorName: 'Cameron White',
            isRead: false,
            isBot: false,
            isDeleted: false,
            isFavorited: false,
        },
        {
            id: 1,
            type: 'email',
            content: '1',
            authorName: 'Cameron White',
            isRead: false,
            isBot: false,
            isDeleted: false,
            isFavorited: false,
        },
        {
            id: 2,
            type: 'email',
            content: '2',
            authorName: 'Cameron White',
            isRead: false,
            isBot: false,
            isDeleted: false,
            isFavorited: false,
        },
        {
            id: 3,
            type: 'email',
            content: '3',
            authorName: 'Cameron White',
            isRead: false,
            isBot: false,
            isDeleted: false,
            isFavorited: false,
        },
    ]);

    return (
        <TarpGrid>
            {
                messages.map(message => {
                    return (
                        <TarpGridItem
                            title={'TITLE'}
                            authorName={'Author Name'}
                            courseCode={'SAH4096'}
                            date={'2021/11/1'}
                            onDelete={() => {
                                setMessages(messages.filter(item => item.id !== message.id));
                            }}
                            onSelect={() => { }}
                            content={message.content}
                            subtitle={'Subtitle here'}
                        />
                    )
                })
            }
        </TarpGrid>
    );

}

const mapStateToProps = state => ({
    messages: state.messages
})

export default connect(mapStateToProps)(Messages);