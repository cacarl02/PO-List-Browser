import React, { useEffect, useState } from 'react'
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

    useEffect(() => {
        if (filteredData.length === 1) {
            setClickedProduct(filteredData[0]);
        } else {
            setClickedProduct([])
        }
    }, [filteredData]);

    return (
    <div className='list-container'>
        {filteredData.length === 0 ? (
        <div className='no-items'>No items match your search.</div>
        ) : 
        (filteredData.map((data) => {
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
                    <div className="avatar">
                        <Avatar
                            size={48}
                            name={data.name}
                            square={true}
                            variant="marble"
                            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                        />
                    </div>
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
        }))
        }
    </div>
  )
}

export default ProductsData