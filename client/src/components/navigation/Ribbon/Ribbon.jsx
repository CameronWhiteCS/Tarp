import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'

import { ReactComponent as IconEdit } from 'res/icon/edit.svg'
import { ReactComponent as IconMail } from 'res/icon/mail.svg'
import { ReactComponent as IconLayers } from 'res/icon/layers.svg'
import { ReactComponent as IconExternalLink } from 'res/icon/external-link.svg'
import { ReactComponent as IconSend } from 'res/icon/send.svg'
import { ReactComponent as IconVolume } from 'res/icon/volume.svg'
import { ReactComponent as IconMessageCircle } from 'res/icon/message-circle.svg'
import { ReactComponent as IconMessageSquare } from 'res/icon/message-square.svg'
import { ReactComponent as IconStar } from 'res/icon/star.svg'
import { ReactComponent as IconTrash } from 'res/icon/trash-2.svg'
import { ReactComponent as IconLouOut } from 'res/icon/log-out.svg'
import { ReactComponent as IconGrid } from 'res/icon/grid.svg'

import { ReactComponent as IconCheck } from 'res/icon/check.svg'

import './sidebar.css'


const Sidebar = (props) => {

    const location = useLocation();
    const section = location.pathname?.split('/')[1];


    const history = useHistory();

    const visitUrl = (url) => {
        history.push(url);
    }

    return (
        <div id="ribbon">

            <div className="ribbon-item"> </div>

            <div class={`ribbon-item ${section === '' ? 'selected' : ''}`}>
                <IconUser onClick={() => visitUrl('/')} />
                Account
            </div>


            <div class={`ribbon-item ${section === 'asdf' ? 'selected' : ''}`}>
                <IconSettings onClick={() => visitUrl('/')} />
                Settings
            </div>


            <div class={`ribbon-item ${section === 'courses' ? 'selected' : ''}`}>
                <IconBook onClick={() => visitUrl('/courses')} />
                Courses
            </div>

            <div class={`ribbon-item ${section === 'messages' ? 'selected' : ''}`}>
                <IconInbox onClick={() => visitUrl('/messages')} />
                Messages
            </div>


            <div class={`ribbon-item ${section === 'asdf' ? 'selected' : ''}`}>
                <IconUsers onClick={() => visitUrl('/')} />
                People
            </div>

            <div class={`ribbon-item ${section === 'asfd' ? 'selected' : ''}`}>
                <IconCalendar onClick={() => visitUrl('/')} />
                Calendar
            </div>

            <div class={`ribbon-item ${section === 'asdf' ? 'selected' : ''}`}>
                <IconHelpCircle onClick={() => visitUrl('/')} />
                Help
            </div>

            {
                props.userData.isAdmin === true &&
                <div class={`ribbon-item ${section === 'admin' ? 'selected' : ''}`}>
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