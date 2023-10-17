import React, { useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai'
import './modal.css'
import supplierData from '../suppliers.json'
import productData from '../products.json'
import Inputfield from './Inputfield'
import SuppliersData from './SuppliersData'
import ProductsData from './ProductsData'
import SelectedItemsData from './SelectedItemsData'
import { toast } from 'react-toastify';


function Modal(props) {

  const notifyDeleteItem = (items) => {
    toast.success(`Deleted ${items.sku} successfully.`)
  }

  const notifyAddAllItems = (items) => {
    const selectedItemsSku = items.map(item => item.sku)
    const joinedItems = selectedItemsSku.join(', ')
    toast.success(`Added ${joinedItems} successfully.`)
  }
  const { isModalOpen, setIsModalOpen } = props

  const [title, setTitle] = useState(null)
  const [isProductClose, setIsProductClose] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState(supplierData)

  const [selectedItems, setSelectedItems] = useState([])
  const [selectedItemsClosed, setSelectedItemsClosed] = useState(true)

  const updateSelectedItems = (newSelectedItems) => {
    setSelectedItems(newSelectedItems)
  }
  const updateDeletedItems = () => {
    setSelectedItemsClosed(true)
  }

  const handleSupplierClick = (name) => {
    if(isProductClose) {
      setTitle(name)
    }
    setIsProductClose(false)
    setSearchText('')
    setFilteredData(productData.data)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setIsProductClose(true)
    setTitle(null)
    setSearchText('')
    setFilteredData(supplierData)
    setSelectedItems([])
    setSelectedItemsClosed(true)
  }
  const handleReturn = () => {
    setIsProductClose(true)
    setTitle(null)
    setSearchText('')
    setFilteredData(supplierData)
  }
  const checkSelectedItems = () => {
    setSelectedItemsClosed(false)
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
            { !isProductClose && !selectedItems.length && <button className='btn-back' onClick={handleReturn}><AiOutlineArrowLeft /></button>}
            { !selectedItemsClosed && <button className='btn-back' onClick={()=> setSelectedItemsClosed(true)}><AiOutlineArrowLeft /></button>}
            <button className='btn-close' onClick={handleModalClose}><AiOutlineClose /></button>
          </div>
          {selectedItemsClosed && <Inputfield 
            placeholder={isProductClose ? 'Search supplier' : 'Search product'}
            searchText={searchText}
            handleSearchInput={handleSearchInput}
          />}
          {isProductClose ?
          <SuppliersData 
            filteredData={filteredData}
            handleSupplierClick={handleSupplierClick}
          /> : selectedItemsClosed ?
          <ProductsData 
            filteredData={filteredData}
            selectedItems={selectedItems}
            updateSelectedItems={updateSelectedItems}
            setSelectedItemsClosed={setSelectedItemsClosed}
          /> :
          <SelectedItemsData 
            selectedItems={selectedItems}
            updateSelectedItems={updateSelectedItems}
            notifyDeleteItem={notifyDeleteItem}
            updateDeletedItems={updateDeletedItems}
          />
          }
          <div className='modal-bottom'>
            <button 
              className='modal-bottom-left'
              onClick={checkSelectedItems}
              disabled={selectedItems.length === 0}
            >
              {selectedItems.length} Product{selectedItems.length > 1 ? 's' : ''} selected
            </button>
            <div className='modal-bottom-right'>
              <button>CANCEL</button>
              <button
                disabled={selectedItems.length === 0}
                onClick={() => notifyAddAllItems(selectedItems)}
              >ADD
              </button>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default Modal