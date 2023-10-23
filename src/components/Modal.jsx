import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai'
import './modal.css'
import supplierData from '../suppliers.json'
import productData from '../products.json'
import Inputfield from './Inputfield'
import SuppliersData from './SuppliersData'
import ProductsData from './ProductsData'
import SelectedItemsData from './SelectedItemsData'
import { toast } from 'react-toastify';


function Modal({ setIsModalOpen }) {

  // for toast add, delete, and undo functions
  const undoDeletedItem = (item) => {
    updateSelectedItems((prevSelectedItems) => {
      return [...prevSelectedItems, item]
    })
  }
  const deleteItem = (item) => {
    toast.success(
      <div>
        <div>
          Deleted <strong>SKU: {item.sku}</strong> successfully.
        </div>
          <button onClick={() => undoDeletedItem(item)}>Undo</button>
      </div>
    )
  }
  const addAllItems = (items) => {
    const selectedItemsSku = items.map(item => item.sku)
    const joinedItems = selectedItemsSku.join(', ')
    toast.success(
      <p>
        Add <strong>{joinedItems}</strong> for {title} successfully.
      </p>
    )
    console.log(title, items)
    handleModalClose()
  }

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

  useEffect(() => {

    const filtered = (isProductClose ? supplierData : productData.data).filter((obj) => 
      obj.name.toLowerCase().includes(searchText.toLowerCase())
    )
    setFilteredData(filtered)

    if(!isProductClose) {
      const childFiltered = productData.data.filter((obj) => 
      obj.childProducts.some(childProduct =>
        childProduct.sku.toLowerCase().includes(searchText.toLowerCase()))
    )
    
    if(childFiltered.length === 1) {
      const matchedChildProducts = childFiltered[0].childProducts.filter(childProduct => 
        childProduct.sku.toLowerCase().includes(searchText.toLowerCase()))
        const updatedChildFiltered = [...childFiltered];
        updatedChildFiltered[0] = {
          ...updatedChildFiltered[0],
          childProducts: matchedChildProducts
        };
      
        setFilteredData(updatedChildFiltered);
      
      } else {
        setFilteredData(filtered)
      }
    }

    
      
  }, [searchText, isProductClose])

  return (
    <div className='modal'>
      <div className='modal-container'>
        <div className='modal-top'>
          <div>{title ? title : 'Browse'}</div>
          { !isProductClose && !selectedItems.length && <button className='btn-back' onClick={handleReturn}><AiOutlineArrowLeft /></button>}
          { !selectedItemsClosed && <button className='btn-back' onClick={()=> setSelectedItemsClosed(true)}><AiOutlineArrowLeft /></button>}
          <button className='btn-close' onClick={handleModalClose}><AiOutlineClose /></button>
        </div>
        {selectedItemsClosed && <Inputfield 
          placeholder={isProductClose ? 'Search supplier' : 'Search product'}
          searchText={searchText}
          setSearchText={setSearchText}
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
          deleteItem={deleteItem}
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
            <button onClick={() => handleModalClose()}>CANCEL</button>
            <button
              disabled={selectedItems.length === 0}
              onClick={() => addAllItems(selectedItems)}
            >ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal