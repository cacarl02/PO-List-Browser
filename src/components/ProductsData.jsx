import React from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import Avatar from 'boring-avatars'

function ProductsData({ filteredData, handleProductClick }) {
  return (
    <div className='list-container'>
        {filteredData.map((data) => (
        <div
            key={data.id}
            onClick={() => handleProductClick(data.name)}
            className='list-product'
        >
                <div className='name-avatar-container'>
                    <Avatar
                        className="avatar"
                        size={32}
                        name={data.name}
                        square={true}
                        variant="marble"
                        colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                    />
                    <div className='product-name'>
                        <span>{data.name}</span>
                        <span>{data.supplierId}</span>
                    </div>
                </div>
                <span className='arrow-dropdown'><AiOutlineRight /></span>
        </div>
        ))
        }
    </div>
  )
}

export default ProductsData