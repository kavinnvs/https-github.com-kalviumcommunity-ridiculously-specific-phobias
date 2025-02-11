import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const Productcard = ({ name, image, price, description }) => {
  const [, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval= setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % image.length);
    }, 2000);

    return () => {
      clearInterval(interval);
  }, [image, setCurrentIndex];

  }, [image]);


  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-6 transition-all hover:shadow-2xl">
      {/* Left Side - Image & Info */}
      <div className="w-full md:w-1/2">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-60 object-cover rounded-xl mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>

      {/* Right Side - Price & Button */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <h1 className="text-2xl font-bold text-gray-900 my-3">{price}</h1>
        <button className="w-full text-white px-5 py-3 rounded-lg bg-black hover:bg-gray-800 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

Productcard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}