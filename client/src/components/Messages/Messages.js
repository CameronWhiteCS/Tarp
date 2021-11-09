import { connect } from 'react-redux'

import './style.css'

import TarpGrid from 'components/TarpGrid';
import TarpGridItem from 'components/TarpGridItem';

const Messages = (props) => {

    const messages = [
        {
            id: 1,
            content: 'hello, wasdfasfasdfasfd asd fas d f asdaf  asfasf  ass asf asf asf as asf asf asfdorld! asd fas d ad fasd fasdfas f',
            authorName: 'Cameron White'
        },
        {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        },
        {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        },
        {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        }, {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        }, {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        }, {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        }, {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        }, {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        }, {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        }, {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        }, {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        }, {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        }, {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        }, {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        }, {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        }, {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        }, {
            id: 1,
            content: 'hello, world!',
            authorName: 'Cameron White'
        },
    ]

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
                            onDelete={() => {}}
                            onSelect={() => {}}
                            content={'Content here'}
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