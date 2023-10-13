import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

function Inputfield({ placeholder, searchText, handleSearchInput }) {
  return (
    <div className='search-container'>
      <input
        type='text'
        placeholder={placeholder}
        className='search-input'
        value={searchText}
        onChange={handleSearchInput}
      />
      <span className='input-glass'><FaMagnifyingGlass /></span>
  </div>
  )
}

export default Inputfield