import React, { useState } from 'react'

function ProductChildren({ productIdMatch, data}) {
    const [selectedItems, setSelectedItems] = useState([])

    const handleCheckboxChange = (childId) => {
        setSelectedItems((prevSelectedItems) => {
          if (prevSelectedItems.some((item) => item.id === childId)) {
            // Uncheck the checkbox and remove the item
            return prevSelectedItems.filter((item) => item.id !== childId);
          } else {
            // Check the checkbox and add the item
            const child = data.childProducts.find((child) => child.id === childId);
            return [...prevSelectedItems, { ...child, quantity: 1 }];
          }
        });
      };
    
      const handleQuantityChange = (childId, quantity) => {
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.map((item) =>
            item.id === childId ? { ...item, quantity: quantity } : item
          )
        );
      };
      console.log(selectedItems)
    return (
        <>
            {productIdMatch && 
            <div className='product-children'>
                {data.childProducts.map((child) => (
                    <label key={child.id}>
                        <div className='product-child'>
                            <div className='product-child-left'>
                                <input 
                                    id={`check-${child.id}`} 
                                    type="checkbox"
                                    onChange={() => handleCheckboxChange(child.id)}
                                    checked={selectedItems.some((item) => item.id === child.id)}
                                />
                                <div className='product-child-name'>
                                    <div>{child.name}</div>
                                    <div>SKU: {child.sku}</div>
                                </div>
                            </div>
                            <input 
                                id={`number-${child.id}`} 
                                type='number'
                                onChange={(e) => handleQuantityChange(child.id, e.target.value)}
                                disabled={!selectedItems.some((item) => item.id === child.id)}
                                value={selectedItems.find((item) => item.id === child.id)?.quantity || '1'}
                            />
                        </div>
                    </label>
                ))}
            </div>
            }
        </>
    )
}

export default ProductChildren