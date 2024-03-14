import React, { useState, useEffect } from 'react'
import { AiOutlineRight } from 'react-icons/ai'

function SuppliersData({ filteredData, handleSupplierClick }) {
  const [selectedItem, setSelectedItem] = useState(-1);

  // Handle arrow key presses to move the selection.
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp' && selectedItem > 0) {
      setSelectedItem(selectedItem - 1);
    } else if (e.key === 'ArrowUp' && selectedItem <= 0) {
      setSelectedItem(filteredData.length -1)
    } else if (e.key === 'ArrowDown' && selectedItem < filteredData.length - 1) {
      setSelectedItem(selectedItem + 1);
    } else if (e.key === 'ArrowDown' && selectedItem === filteredData.length - 1) {
      setSelectedItem(0)
    }
  };

  // Handle "Enter" key press to trigger handleSupplierClick.
  const handleEnter = (e) => {
    if (e.key === 'Enter' && selectedItem >= 0) {
      handleSupplierClick(filteredData[selectedItem].name)
    }
  };

  // Attach event listeners for arrow keys and Enter key.
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);

  useEffect(() => {
    document.addEventListener('keydown', handleEnter);
    return () => {
      document.removeEventListener('keydown', handleEnter);
    };
  }, [selectedItem])

  return (
    <div className='list-container'>
      {filteredData.length === 0 ? (
        <div className='no-items'>No items match your search.</div>
      ) : 
      (filteredData.map((data, index) => (
        <div
          key={data.id}
          onClick={() => handleSupplierClick(data.name)}
          className={`list-supplier ${selectedItem === index ? 'selected' : ''}`}
        >
          <span>{data.name}</span>
          <span className='arrow-dropdown'><AiOutlineRight /></span>
        </div>
      )))

      }
  </div>
  )
}

export default SuppliersData