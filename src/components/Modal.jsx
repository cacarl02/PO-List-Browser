import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineRight } from 'react-icons/ai'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import './modal.css'
import supplierData from '../suppliers.json'
import productData from '../products.json'


function Modal(props) {
  const { isModalOpen, setIsModalOpen } = props

  const [title, setTitle] = useState(null)

  const handleSupplierClick = (name) => {
    setTitle(name)
    setIsProductClose(false)
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
    setTitle(null)
    setIsProductClose(true)
  }

  const [isProductClose, setIsProductClose] = useState(true)

  return (
    <div>
      {isModalOpen && 
      <div className='modal'>
        <div className="overlay" onClick={handleModalClose}></div>
        <div className='modal-content'>
          <h2>{title ? title : 'Browse'}</h2>
          <div>
            <input
              type='text'
              placeholder='Search supplier'
            />
            <FaMagnifyingGlass />
          </div>
          { isProductClose ?
          supplierData.map((supplier) => (
            <div
              key={supplier.id}
              onClick={() => handleSupplierClick(supplier.name)}
            >
              <div>
                <span>{supplier.name}</span>
                <span><AiOutlineRight /></span>
              </div>
            </div>
          )) : 
          productData.data.map((product) => (
            <div
              key={product.id}
            >
              <div>
                <span>{product.name}</span>
                <span><AiOutlineRight /></span>
              </div>
            </div>
          ))
          }
          <button className='btn-close' onClick={handleModalClose}><AiOutlineClose /></button>
        </div>
      </div>
      }
    </div>
  )
}

export default Modal