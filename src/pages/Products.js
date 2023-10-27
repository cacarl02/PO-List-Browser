import React, { useEffect, useRef, useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import Modal from '../components/Modal'
import './products.css'

function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)
  const browseButtonRef = useRef(null)

  useEffect(() => {
    if(isModalOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isModalOpen])

  const handleBrowseButtonClick = () => {
    setIsModalOpen(!isModalOpen);
      browseButtonRef.current.blur(); // Remove focus from the "Browse" button when closing the modal.
  };

  return (
    <div className='main-container'>
      <div className='main-top'>
        <div style={{fontSize: 20}}>Product Search</div>
        <button className='btn-browse' onClick={handleBrowseButtonClick} ref={browseButtonRef}>Browse</button>
      </div>
      <div className='main-search-container'>
        <input
          type='text'
          placeholder='Search by SKU or Product'
          className='search-input'
        />
        <span className='input-glass'><FaMagnifyingGlass /></span>
      </div>
      <div className={isModalOpen ? '' : 'hidden'}>
        <Modal
          refs={modalRef} 
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  )
}

export default Products