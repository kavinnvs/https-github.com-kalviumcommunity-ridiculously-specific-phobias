import React from 'react'
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const ProductCardSeller = ({ image, name, price, description, id }) => { // Corrected component name
  const [currentIndex, setCurrentIndex] = useState(0); // Corrected useState usage
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % image.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    }
  }, [image]);

  const currentImage = image[currentIndex]; // Corrected variable name

  const handleDelete = () => {
    // Define handleDelete function
    console.log(`Delete product with id: ${id}`);
  }

  const handleEdit = (id) => {
    // Define handleEdit function
    navigate(`/editProduct/${id}`);
  }

  return (
    <div className="bg-neutral-200 p-4 rounded-lg shadow-md flex justify-between flex-col">
      <div className='w-full'>
        <img src={currentImage} alt={name} className='w-full h-56 object-cover rounded-lg mb-2'/> {/* Corrected image source */}
        <h1 className='text-lg font-bold'>{name}</h1>
        <h3 className='text-sm opacity-50 line-clamp-2'>{description}</h3>
      </div>
      <div className='w-full'>
        <h1 className='text-lg font-bold my-2'>${price}</h1>
        <button className='w-full text-white px-4 py-2 rounded-md bg-neutral-900' onClick={handleDelete}>Delete</button>
        <button className='w-full text-white px-4 py-2 rounded-md bg-neutral-900' onClick={() => handleEdit(id)}>Edit</button>
      </div>
    </div>
  );
};


ProductCardSeller.propTypes = {
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};


export default ProductCardSeller;