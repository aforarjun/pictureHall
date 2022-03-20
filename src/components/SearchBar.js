import React from 'react';

import SearchIcon from '../assets/search.svg'

function SearchBar({searchMovies}) {

  return (
    <div className='search'>
        <input type="text" onChange={searchMovies} />
        <img src={SearchIcon} alt="searchIcon" />
    </div>
  )
}

export default SearchBar