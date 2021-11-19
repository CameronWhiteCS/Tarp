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

    return (
        <div id="ribbon">

            <div class='ribbon-component'>
                <div>MAIL BOX</div>
                <div class='ribbon-section'>
                    <div>
                        <IconEdit  />
                        Compose
                    </div>
                </div>
            </div>

            <div class='ribbon-component'>
                <div>MAIL BOX</div>
                <div class='ribbon-section'>
                    <div >
                        <IconLayers  />
                        All
                    </div>

                    <div >
                        <IconMail  />
                        Unread
                    </div>

                    <div >
                        <IconSend  />
                        Sent
                    </div>
                </div>
            </div>

            <div class='ribbon-component'>
                POST TYPES
                <div class='ribbon-section'>
                    <div >
                        <IconVolume  />
                        Announce.
                    </div>

                    <div class={`ribbon-item ${section === 'asfd' ? 'selected' : ''}`}>
                        <IconMessageSquare  />
                        Discussions
                    </div>

                    <div >
                        <IconMessageCircle  />
                        Messages
                    </div>
                </div>
            </div>


            <div class='ribbon-component'>
                ORGANIZATION
                <div class='ribbon-section'>
                    <div >
                        <IconStar  />
                        Marked
                    </div>

                    <div >
                        <IconTrash  />
                        Trash
                    </div>

                    <div >
                        <IconLouOut  />
                        Auto.
                    </div>
                </div>
            </div>

            <div class='ribbon-component'>
                <div style={{ color: "#084B81" }}>MAIL BOX</div>
                <div class='ribbon-section'>
                    <div >
                        <IconCheck  />
                        All Read
                    </div>
                </div>
            </div>

        </div >
    )
}

const mapStateToProps = (state) => ({
    userData: state.userData
})

export default connect(mapStateToProps)(Sidebar);