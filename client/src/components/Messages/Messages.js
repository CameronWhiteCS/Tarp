import axios from 'axios';
import moment from 'moment-timezone'

import { connect } from 'react-redux'
import { useState, useEffect } from 'react';
import { addLoadingReason, removeLoadingReason } from 'actions/loadingReasonActions';
import { Form } from 'react-bootstrap'

import TarpGrid from 'components/TarpGrid';
import TarpGridItem from 'components/TarpGridItem';
import Ribbon from 'components/Ribbon';
import CourseFilter from 'components/CourseFilter';

import { addError } from 'actions/errorActions';
import { setCourses } from 'actions/courseActions';
import { useHistory, useParams } from 'react-router';

const Messages = (props) => {

    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [courseFilter, setCourseFilter] = useState(undefined);
    const [filterState, setFilterState] = useState({
        readUnread: 'ALL', // 'ALL' | 'READ' | 'UNREAD' 
        messageType: 'ALL', //'ANNOUNCEMENTS' | 'DISCUSSIONS' | 'EMAILS' | 'ALL'
        showOnly: 'ALL', // 'MARKED' | 'TRASH' | 'AUTO' | 'ALL' 
    });

    const params = useParams();
    const history = useHistory();

    const fetchMessages = () => {

        const loadingReason = 'Fetching messages...';
        addLoadingReason(loadingReason)(props.dispatch)

        return axios.get('/api/v1/messages')
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

    const fetchCourses = () => {

        const loadingReason = 'Fetching courses...';

        addLoadingReason(loadingReason)(props.dispatch);

        return axios.get(`/api/v1/courses/user/${props?.userData?.id}`)
            .then(res => {
                setCourses(res.data)(props.dispatch)
            })
            .catch(err => {
                addError(err.response.data)(props.dispatch)
            })
            .finally(() => {
                removeLoadingReason(loadingReason)(props.dispatch)
            })

    }

    const applyUrlParameters = () => {

        if (props.courses.length <= 0) return;

        for (let i = 0; i < props.courses.length; i++) {
            const course = props.courses[i];
            if (course.id === parseInt(params.courseId)) {
                setCourseFilter(course);
                history.push('/messages')
                break;
            }
        }

    }

    const init = () => {
        fetchMessages();
        fetchCourses();
    }

    useEffect(init, [])
    useEffect(applyUrlParameters, [props.courses])




    /** Operations on messages**/

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
            setTimeout(() => {

                axios.delete(`/api/v1/message/${message.id}`)
                    .then(() => {
                        setMessages(messages.filter(msg => msg.id !== message.id))
                    })
                    .catch(err => {
                        addError(err.response.data)(props.dispatch);
                    })

            }, 250)

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


    const markAsRead = message => {

        axios.put(`/api/v1/message/${message.id}`, { isRead: true })
            .catch(err => {
                addError(err.response.error)(props.dispatch)
            })
            .finally(() => {

                const newMessages = [...messages];

                for (let i = 0; i < newMessages.length; i++) {
                    if (newMessages[i].id === message.id) {
                        newMessages[i].isRead = true;
                        break;
                    }
                }

                setMessages(newMessages);

            });

    }


    /** Message formatting **/

    const getHeaderColor = msg => {
        if (msg.type === 'EMAIL') {
            return '#084b81'
        } else if (msg.type === 'DISCUSSION_BOARD_POST') {
            return 'black';
        } else {
            return '#27ae60'
        }
    }

    const getFormattedMessageType = msg => {
        if (msg.type === 'EMAIL') {
            return 'Email'
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


    const getIconName = msg => {
        if (msg.type === 'EMAIL') {
            return 'mail'
        } else if (msg.type === 'DISCUSSION_BOARD_POST') {
            return 'volume'
        } else if (msg.type === 'ANNOUNCEMENT') {
            return 'message-square';
        }
    }



    /** Filtering logic **/

    const applyTextFilter = messages => {
        return messages.filter(msg => {
            return JSON.stringify(msg).toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
        });
    }

    const applyCourseFilter = messages => {
        if (!courseFilter) return messages;
        return messages.filter(msg => msg.course.code === courseFilter.code)
    }

    const applyShowOnly = messages => {
        //'MARKED' | 'TRASH' | 'AUTO' | undefined 
        switch (filterState.showOnly) {
            case 'MARKED':
                return messages.filter(msg => msg.isFavorited === true)
            case 'TRASH':
                return messages.filter(msg => msg.isDeleted === true)
            case 'AUTO':
                return messages.filter(msg => msg.isAutomated === true)
            default:
                return messages;
        }
    }

    const applyFilterUnread = messages => {
        switch(filterState.readUnread) {
            case 'ALL':
                return messages;
            case 'UNREAD':
                return messages.filter(msg => msg.isRead === false);
            case 'READ':
                return messages.filter(msg => msg.isRead === true);
            default:
                return messages;
        }
    }

    const applyMessageType = messages => {
        switch (filterState.messageType) {
            case 'ANNOUNCEMENTS':
                return messages.filter(msg => msg.type === 'ANNOUNCEMENT')
            case 'EMAILS':
                return messages.filter(msg => msg.type === 'EMAIL')
            case 'DISCUSSIONS':
                return messages.filter(msg => msg.type === 'DISCUSSION_BOARD_POST')
            default:
                return messages;
        }
    }

    const applyFilters = messages => {

        messages = applyTextFilter(messages);
        messages = applyCourseFilter(messages);
        messages = applyShowOnly(messages);
        messages = applyFilterUnread(messages);
        messages = applyMessageType(messages);

        if (filterState.showOnly !== 'TRASH') {
            messages = messages.filter(msg => msg.isDeleted === false)
        }

        return messages;
    }

    return (


        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Ribbon
                messages={messages}
                applyFilters={applyFilters}
                setMessages={setMessages}
                filterState={filterState}
                setFilterState={setFilterState}
                deleteMessage={deleteMessage}
            />

            <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>

                <div style={{ display: 'flex', flexDirection: 'column', padding: '5px', height: '100%', width: '100%' }}>

                    <div class="search-bar">
                        <Form.Control
                            type="text"
                            placeholder="Search Messages"
                            onChange={e => { setSearchTerm(e.target.value) }}
                        />
                    </div>

                    <TarpGrid>
                        {
                            applyFilters(messages).map(message => {
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
                                        iconName={getIconName(message)}
                                        onClick={() => markAsRead(message)}
                                        read={message.isRead}
                                    />
                                )
                            })
                        }
                    </TarpGrid>

                </div>

                <CourseFilter
                    courseFilter={courseFilter}
                    setCourseFilter={setCourseFilter}
                />
            </div>

        </div>

    );

}

const mapStateToProps = state => ({
    messages: state.messages,
    courses: state.courses,
    userData: state.userData
})

export default connect(mapStateToProps)(Messages);