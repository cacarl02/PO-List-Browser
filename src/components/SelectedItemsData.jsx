import React, { useEffect } from 'react'
import Avatar from 'boring-avatars'
import { FiTrash2 } from 'react-icons/fi'

function SelectedItemsData({ selectedItems, updateSelectedItems, deleteItem, updateDeletedItems }) {
  const handleDeleteItems = (selectedItem) => {
    updateSelectedItems(selectedItems.filter(item => item.id !== selectedItem.id))
    deleteItem(selectedItem)
  }

  useEffect(() => {
    if(selectedItems.length < 1) {
      updateDeletedItems()
    }
  })

  return (
    <div className='list-selection-container'>
      {selectedItems.map((item, index) => (
        <div key={item.id} className='list-selection'>
          <div className='list-selection-number'>{index + 1}</div>
          <div className="avatar">
            <Avatar
                size={48}
                name={item.name}
                square={true}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </div>
          <div className='product-name'>
              <div><strong>{item.sku}</strong></div>
              <div>{item.productName}</div>
              <div>{item.name}</div>
          </div>
          <input type="number" value={item.quantity} readOnly={true} />
          <button onClick={() => handleDeleteItems(item)} className='btn-trash'><FiTrash2 /></button>
        </div>
      ))}
    </div>
  )
}

export default SelectedItemsData