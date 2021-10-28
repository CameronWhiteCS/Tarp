import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'

import { ReactComponent as IconBook } from 'res/icon/book.svg'
import { ReactComponent as IconCalendar } from 'res/icon/calendar.svg'
import { ReactComponent as IconHelpCircle } from 'res/icon/help-circle.svg'
import { ReactComponent as IconInbox } from 'res/icon/inbox.svg'
import { ReactComponent as IconTool } from 'res/icon/tool.svg'
import { ReactComponent as IconSettings } from 'res/icon/settings.svg'
import { ReactComponent as IconUser } from 'res/icon/user.svg'
import { ReactComponent as IconUsers } from 'res/icon/users.svg'

import './sidebar.css'


const Sidebar = (props) => {

    const location = useLocation();
    const section = location.pathname?.split('/')[1];


    const history = useHistory();

    const visitUrl = (url) => {
        history.push(url);
    }

    return (
        <div id="sidebar">

            <div className="sidebar-item"> </div>

            <div class={`sidebar-item ${section === '' ? 'selected' : ''}`}>
                <IconUser onClick={() => visitUrl('/')} />
                Account
            </div>


            <div class={`sidebar-item ${section === 'asdf' ? 'selected' : ''}`}>
                <IconSettings onClick={() => visitUrl('/')} />
                Settings
            </div>


            <div class={`sidebar-item ${section === 'asdf' ? 'selected' : ''}`}>
                <IconBook onClick={() => visitUrl('/')} />
                Courses
            </div>

            <div class={`sidebar-item ${section === 'asf' ? 'selected' : ''}`}>
                <IconInbox onClick={() => visitUrl('/')} />
                Messages
            </div>


            <div class={`sidebar-item ${section === 'asdf' ? 'selected' : ''}`}>
                <IconUsers onClick={() => visitUrl('/')} />
                People
            </div>

            <div class={`sidebar-item ${section === 'asfd' ? 'selected' : ''}`}>
                <IconCalendar onClick={() => visitUrl('/')} />
                Calendar
            </div>

            <div class={`sidebar-item ${section === 'asdf' ? 'selected' : ''}`}>
                <IconHelpCircle onClick={() => visitUrl('/')} />
                Help
            </div>

            {
                props.userData.isAdmin === true &&
                <div class={`sidebar-item ${section === 'admin' ? 'selected' : ''}`}>
                    <IconTool onClick={() => visitUrl('/admin')} />
                    Admin Settings
                </div>
            }

        </div>
    )
}

const mapStateToProps = (state) => ({
    userData: state.userData
})

export default connect(mapStateToProps)(Sidebar);