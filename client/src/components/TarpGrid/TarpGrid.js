import './style.css'

const TarpGrid = (props) => {
    return (
        <div class="tarp-grid">
            {props.children}
        </div>
    );
}

export default TarpGrid;