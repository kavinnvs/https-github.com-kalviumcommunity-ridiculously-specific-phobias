import React from 'react';
import { useState,useEffect } from 'react';

export const Productcard = ({ name, image, price, description }) => {
  const {currentindex,setCurrentindex} = useState(0);

  useEffect(() => {
    const interval= setInterval(() => {
      setCurrentindex((prev)=>(prev+1)%image.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    }
  },[image])

  const currentimage=image[currentindex];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-6 transition-all hover:shadow-2xl">
      {/* Left Side - Image & Info */}
      <div className="w-full md:w-1/2">
        <img 
          src={currentimage} 
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
};