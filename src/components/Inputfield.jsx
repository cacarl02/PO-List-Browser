import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

function Inputfield({ placeholder, searchText, setSearchText }) {

  return (
    <div className='search-container'>
      <input
        type='text'
        placeholder={placeholder}
        className='search-input'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <span className='input-glass'><FaMagnifyingGlass /></span>
  </div>
  )
}

export default Inputfield