import React from 'react'
import Avatar from 'boring-avatars'
import { FiTrash2 } from 'react-icons/fi'

function SelectedItemsData({ selectedItems }) {
  return (
    <div className='list-container'>
      {selectedItems.map((item) => (
        <div key={item.id} className='list-selection'>
            <div className='name-avatar-container'>
              <Avatar
                  className="avatar"
                  size={32}
                  name={item.name}
                  square={true}
                  variant="marble"
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
              <div className='product-name'>
                  <span>{item.sku}</span>
                  <span>{item.id}</span>
                  <span>{item.name}</span>
              </div>
            </div>
            <div>
              <input type="number" value={item.quantity} readOnly={true} />
              <FiTrash2 />
            </div>
          </div>
        ))}
    </div>
  )
}

export default SelectedItemsData