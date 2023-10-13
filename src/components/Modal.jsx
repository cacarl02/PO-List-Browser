import React, { useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai'
import './modal.css'
import supplierData from '../suppliers.json'
import productData from '../products.json'
import Inputfield from './Inputfield'
import SuppliersData from './SuppliersData'
import ProductsData from './ProductsData'


function Modal(props) {
  const { isModalOpen, setIsModalOpen } = props

  const [title, setTitle] = useState(null)
  const [isProductClose, setIsProductClose] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState(supplierData)

  const handleSupplierClick = (name) => {
    if(isProductClose) {
      setTitle(name)
    }
    setIsProductClose(false)
    setSearchText('')
    setFilteredData(productData.data)
  }

  const handleProductClick = () => {

  }
  const handleModalClose = () => {
    setIsModalOpen(false)
    setIsProductClose(true)
    setTitle(null)
    setSearchText('')
    setFilteredData(supplierData)
  }
  const handleReturn = () => {
    setIsProductClose(true)
    setTitle(null)
    setSearchText('')
    setFilteredData(supplierData)
  }
  const handleSearchInput = (e) => {
    const inputText = e.target.value
    setSearchText(inputText)
    const filtered = (isProductClose ? supplierData : productData.data).filter((obj) =>
    obj.name.toLowerCase().includes(inputText.toLowerCase()))
    setFilteredData(filtered)
  }

  return (
    <div>
      {isModalOpen && 
      <div className='modal'>
        <div className='modal-container'>
          <div className='modal-top'>
            <div className=''>{title ? title : 'Browse'}</div>
            { !isProductClose && <button className='btn-back' onClick={handleReturn}><AiOutlineArrowLeft /></button>}
            <button className='btn-close' onClick={handleModalClose}><AiOutlineClose /></button>
          </div>
          <Inputfield 
            placeholder={isProductClose ? 'Search supplier' : 'Search product'}
            searchText={searchText}
            handleSearchInput={handleSearchInput}
          />
          {isProductClose ?
          <SuppliersData 
            filteredData={filteredData}
            handleSupplierClick={handleSupplierClick}
          /> : 
          <ProductsData 
            filteredData={filteredData}
            handleProductClick={handleProductClick}
          />
          }
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