
import { ReactComponent as IconTrash } from 'res/icon/trash-2.svg';
import { ReactComponent as IconStar } from 'res/icon/star.svg';
import { ReactComponent as IconUser } from 'res/icon/user.svg';
import { ReactComponent as IconMail } from 'res/icon/mail.svg';
import { ReactComponent as IconVolume } from 'res/icon/volume.svg';
import { ReactComponent as IconMessageSquare } from 'res/icon/message-square.svg';
import { ReactComponent as IconBook } from 'res/icon/book.svg';
import './style.css'

/**
 * 
 * @param {string} [props.title] The title of the grid item as displayed at the top of the card
 * @param {string} [props.authorName] The name of the author of this card
 * @param {string} [props.courseCode] The course code associated with this card, if any. EG: SAH4076
 * @param {string} [props.date] The date (or due date) associated with this item. 
 * @param {string} [props.subtitle] Displayed above the content, but below the header.
 * @param {string} [props.content] The main textual content of the grid item
 * @param {string} [props.headerColor] The background color of the card header. Defaults to #27AE60
 * @param {function} [props.onDelete] Function called when the trash can icon is pressed. The trash can icon is only visible if this function is defined.
 * @param {function} [props.onSelect] Function called when the star icon is pressed. The star icon is only visible if this function is defined.
 * @param {boolean} [props.selected] If true, the star icon for this component has a yellow color to indicate that it's selected, assuming the star icon is visible. 
 * @param {boolean} [props.hideRead] if true, the read recipt is hidden.
 * @param {boolean} [props.read] if true, this item is marked as read. If false, an orange "unread" circle appears. 
 * @param {boolean} [props.hideIcon] If true, the icon displayed for this card will not be shown. 
 * @param {string} [props.iconName] name of the icon file minux the extension
 * @param {func} [props.onClick] Function to run when the card itself is clicked. Primarily used for marking messages as read.
 */
const TarpGridItem = (props) => {

    const titleStyle = {
        backgroundColor: props.headerColor || '#27AE60'

    }

    const getIcon = name => {
        switch (name) {
            case 'mail':
                return <IconMail />
            case 'volume':
                return <IconVolume />
            case 'message-square':
                return <IconMessageSquare />
            case 'book':
                return <IconBook />
            default:
                return <IconUser />
        }
    }

    const starIconStyle = props.selected ? { color: '#FFDB5A' } : {}

    return (
        <div className="tarp-grid-item" onClick={props.onClick}>

            <div className="title" style={titleStyle}>
                {
                    !props.hideRead && (props.read ? <div className="read" /> : <div className="unread" />)
                }
                <span style={{ width: '100%' }}>
                    {props.title || 'Untitled'}
                </span>
            </div>

            <div className="header">
                <div className="header-icon">
                    {!props.hideIcon && getIcon(props.iconName)}
                </div>
                <div className="header-text">
                    {
                        props.authorName &&
                        <p className="author-name">{props.authorName}</p>
                    }
                    {
                        props.courseCode &&
                        <p className="course-code">{props.courseCode}</p>
                    }
                    {
                        props.date &&
                        <p className="date"> {props.date}</p>
                    }
                </div>
            </div>

            {
                props.subtitle &&
                <div className="subtitle">
                    <b>{props.subtitle}</b>
                </div>
            }

            <div className="body">
                <p>{props.content || 'Undefined content'}</p>
            </div>

            {
                (props.onDelete || props.onSelect) &&
                <div className="footer">
                    {props.onSelect && <IconStar onClick={props.onSelect} style={starIconStyle} />}
                    {props.onDelete && <IconTrash onClick={props.onDelete} />}
                </div>
            }

        </div>
    );
}

export default TarpGridItem;