import React, { useEffect, useRef, useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import Modal from '../components/Modal'

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
    <div>
      <div>Product Search</div>
      <button onClick={handleBrowseButtonClick} ref={browseButtonRef}>Browse</button>
      <div>
        <input
          type='text'
        />
      <FaMagnifyingGlass />
      </div>
      {isModalOpen && <Modal
        setIsModalOpen={setIsModalOpen}
        refs={modalRef}
      />}
    </div>
  )
}

export default Products