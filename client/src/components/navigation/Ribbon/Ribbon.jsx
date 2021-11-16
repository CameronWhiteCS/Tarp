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

import './ribbon.css'


const Sidebar = (props) => {

    const location = useLocation();
    const section = location.pathname?.split('/')[1];


    const history = useHistory();

    const visitUrl = (url) => {
        history.push(url);
    }

    return (
        <div id="ribbon">

            <div class='ribbon-section'>
                <div class={`ribbon-item ${section === 'asdf' ? 'selected' : ''}`}>
                    <IconEdit onClick={() => visitUrl('/')} />
                    Compose
                </div>
            </div>

            <div class='ribbon-component'>
                {/* MAIL BOX */}
                <div class='ribbon-section'>
                    <div class={`ribbon-item ${section === 'asdf' ? 'selected' : ''}`}>
                        <IconLayers onClick={() => visitUrl('/')} />
                        All
                    </div>

                    <div class={`ribbon-item ${section === 'asdf' ? 'selected' : ''}`}>
                        <IconMail onClick={() => visitUrl('/')} />
                        Unread
                    </div>

                    <div class={`ribbon-item ${section === 'asdf' ? 'selected' : ''}`}>
                        <IconSend onClick={() => visitUrl('/')} />
                        Sent
                    </div>
                </div>
            </div>


            <div class='ribbon-section'>
                <div class={`ribbon-item ${section === 'asdf' ? 'selected' : ''}`}>
                    <IconVolume onClick={() => visitUrl('/')} />
                    Announce.
                </div>

                <div class={`ribbon-item ${section === 'asfd' ? 'selected' : ''}`}>
                    <IconMessageSquare onClick={() => visitUrl('/')} />
                    Discussions
                </div>

                <div class={`ribbon-item ${section === 'asdf' ? 'selected' : ''}`}>
                    <IconMessageCircle onClick={() => visitUrl('/')} />
                    Messages
                </div>
            </div>


            <div class='ribbon-section'>
                <div class={`ribbon-item ${section === 'asdf' ? 'selected' : ''}`}>
                    <IconStar onClick={() => visitUrl('/')} />
                    Marked
                </div>

                <div class={`ribbon-item ${section === 'asdf' ? 'selected' : ''}`}>
                    <IconTrash onClick={() => visitUrl('/')} />
                    Trash
                </div>

                <div class={`ribbon-item ${section === 'asdf' ? 'selected' : ''}`}>
                    <IconLouOut onClick={() => visitUrl('/')} />
                    Auto.
                </div>
            </div>

            <div class='ribbon-section'>
                <div class={`ribbon-item ${section === 'asdf' ? 'selected' : ''}`}>
                    <IconCheck onClick={() => visitUrl('/')} />
                    All Read
                </div>
            </div>



        </div>
    )
}

const mapStateToProps = (state) => ({
    userData: state.userData
})

export default connect(mapStateToProps)(Sidebar);