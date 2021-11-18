import './style.css'
import { useState } from 'react';

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState('')

    console.log(props.title)

    return (
        <div class="search-bar">
            <input type="text" placeholder="Search Messages" onChange={event => { setSearchTerm(event.target.value) }} />
        </div>
    );
}

export default SearchBar;