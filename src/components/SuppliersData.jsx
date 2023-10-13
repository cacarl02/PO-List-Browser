import React from 'react'
import { AiOutlineRight } from 'react-icons/ai'

function SuppliersData({ filteredData, handleSupplierClick }) {
  return (
    <div className='list-container'>
        {filteredData.map((data) => (
        <div
            key={data.id}
            onClick={() => handleSupplierClick(data.name)}
            className='list-supplier'
        >
            <div className='list-container-supplier'>
            <span>{data.name}</span>
            <span className='arrow-dropdown'><AiOutlineRight /></span>
            </div>
        </div>
        ))
        }
  </div>
  )
}

export default SuppliersData