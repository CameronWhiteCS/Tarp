import './style.css'

const TarpGrid = (props) => {

    const divStyle = {
        fontSize: '28pt',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }



    if (props.children?.length > 0) {
        return (
            <div class="tarp-grid">
                {props.children}
            </div>
        );
    } else {
        return (
            <div style={divStyle}>
                No items found
            </div>
        );
    }





}

export default TarpGrid;