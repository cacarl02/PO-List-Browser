import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineRight } from 'react-icons/ai'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import './modal.css'
import supplierData from '../suppliers.json'
import productData from '../products.json'


function Modal(props) {
  const { isModalOpen, setIsModalOpen } = props

  const [title, setTitle] = useState(null)
  const [isProductClose, setIsProductClose] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState(supplierData)

  const handleSupplierClick = (name) => {
    setTitle(name)
    setIsProductClose(false)
    setSearchText('')
    setFilteredData(supplierData)
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
    setTitle(null)
    setIsProductClose(true)
    setSearchText('')
  }
  const handleSearchInput = (e) => {
    const inputText = e.target.value
    setSearchText(inputText)
    const filtered = supplierData.filter((supplier) =>
    supplier.name.toLowerCase().includes(inputText.toLowerCase()))
    setFilteredData(filtered)
  }

  return (
    <div>
      {isModalOpen && 
      <div className='modal'>
        <div className='modal-container'>
          <div className='modal-top'>
            <div className=''>{title ? title : 'Browse'}</div>
            <button className='btn-close' onClick={handleModalClose}><AiOutlineClose /></button>
          </div>
          <div className='search-container'>
            <input
              type='text'
              placeholder='Search supplier'
              className='search-input'
              value={searchText}
              onChange={handleSearchInput}
            />
            <span className='input-glass'><FaMagnifyingGlass /></span>
          </div>
          <div className='list-container'>
            { isProductClose ?
            filteredData.map((supplier) => (
              <div
                key={supplier.id}
                onClick={() => handleSupplierClick(supplier.name)}
                className='list-supplier'
              >
                <div className='list-container-supplier'>
                  <span>{supplier.name}</span>
                  <span className='arrow-dropdown'><AiOutlineRight /></span>
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
          </div>
          <div className='modal-bottom'>
            <div className='modal-bottom-left'>0 Product selected</div>
            <div className='modal-bottom-right'>
              <button>CANCEL</button>
              <button>ADD</button>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default Modal