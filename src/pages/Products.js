import React, { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import Modal from '../components/Modal.jsx'

function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <div>Product Search</div>
      <button onClick={() => setIsModalOpen(!isModalOpen)}>Browse</button>
      <div>
        <input
          type='text'
        />
      <FaMagnifyingGlass />
      </div>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  )
}

export default Products