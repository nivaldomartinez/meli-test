import React, { useState } from 'react';
import searchIcon from '../../../assets/images/ic_Search.png';
import './Searchbar.css';

const Searchbar = ({ onSearch }) => {

    const [search, setSearch] = useState('');

    /**
     * fire search action when user press enter
     * @param {*} event 
     */
    const searchWithEnter = (event) => {
        const code = event.keyCode || event.which;
        if (code === 13) {
            if (search) {
                onSearch(search)
            }
        }
    }

    return (
        <div className="searchbar-container">
            <input type="text" className="input-field" placeholder="Nunca dejes de buscar"
                value={search} onChange={event => setSearch(event.target.value)}
                onKeyPress={searchWithEnter} name="search" />
            <button disabled={!search} className="search-btn" onClick={() => { onSearch(search) }}>
                <img src={searchIcon} alt="search" />
            </button>
        </div>
    )
}

export default Searchbar;