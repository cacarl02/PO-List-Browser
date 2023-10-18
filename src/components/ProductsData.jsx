import React, { useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import Avatar from 'boring-avatars'
import ProductChildren from './ProductChildren'

function ProductsData({ filteredData, selectedItems, updateSelectedItems }) {

    const [clickedProduct, setClickedProduct] = useState([])
    const handleProductClick = (data) => {
        if(clickedProduct === data) {
            setClickedProduct([])
        } else {
            setClickedProduct(data)
        }
    }

    return (
    <div className='list-container'>
        {filteredData.map((data) => {
            const productIdMatch = data.id === clickedProduct.id
            return (
            <div 
                key={data.id}
                className={productIdMatch ? 'product-clicked' : ''}
                >
                <div
                    className='list-product'
                    onClick={() => handleProductClick(data)}
                >
                    <Avatar
                        className="avatar"
                        size={40}
                        name={data.name}
                        square={true}
                        variant="marble"
                        colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                    />
                    <div className='product-name'>
                        <div>{data.name}</div>
                        <div>SKU: {data.supplierId}</div>
                    </div>
                    <span className='arrow-dropdown'><AiOutlineRight /></span>
                </div>
                <ProductChildren 
                    productIdMatch={productIdMatch}
                    data={data}
                    selectedItems={selectedItems}
                    updateSelectedItems={updateSelectedItems}
                />
            </div>
            )
        })}
    </div>
  )
}

export default ProductsData