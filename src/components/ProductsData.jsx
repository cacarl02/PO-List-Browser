import React from 'react'
import { AiOutlineRight } from 'react-icons/ai'

function ProductsData({ filteredData, handleProductClick }) {
  return (
    <div className='list-container'>
        {filteredData.map((data) => (
        <div
            key={data.id}
            onClick={() => handleProductClick(data.name)}
            className='list-product'
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

export default ProductsData