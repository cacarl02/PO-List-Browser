import React, { useEffect, useRef, useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import Modal from '../components/Modal'
import './products.css'

function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
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
        <div className='btn-browse' onClick={handleBrowseButtonClick} ref={browseButtonRef}>
          <span>Browse</span>
          {selectedItems.length > 0 && !isModalOpen && <span className='notif-count'>{selectedItems.length}</span>}
        </div>
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
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
    </div>
  )
}

export default Products