import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { IoIosAddCircleOutline  } from "react-icons/io";
// import {  MdOutlineRemoveCircleOutline } from "react-icons/io";
export default function CartProduct({ _id, email, images, quantity, price }) {


    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityVal, setQuantityVal] = useState(quantity);
    useEffect(() => {
        if (!images || images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [images]);




    const handleIncrement = () => {
        const newquantityVal = quantityVal + 1;
        setQuantityVal(newquantityVal);
        updateQuantityVal(newquantityVal);
    };
    const handleDecrement = () => {
        const newquantityVal = quantityVal > 1 ? quantityVal - 1 : 1;
        setQuantityVal(newquantityVal);
        updateQuantityVal(newquantityVal);
    };
    const updateQuantityVal = (quantity) => {
        fetch('http://localhost:8000/api/v2/product/cartproduct/quantity', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:email,
                productId: _id,
                quantity:quantity,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to update quantity');
                }
                return res.json();
            })
    };
    
    CartProduct.propTypes = {
        _id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        images: PropTypes.array.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    };

    const currentImage = images && images.length > 0 ? images[currentIndex] : null;

    return (
            <div>
                <div className="flex flex-col gap-y-2">
                    <img
                        src={currentImage} // Ensure the URL is correct\
                        alt={name}
                        className="w-32 h-32 object-cover rounded-lg border border-neutral-300"
                    />
                    <div className="flex flex-row items-center gap-x-2 md:hidden">
                        <div
                            onClick={handleIncrement}
                            className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                        >
                            <IoIosAddCircleOutline />
                        </div>
                        <div className="px-5 py-1 text-center bg-gray-100 rounded-xl pointer-events-none">
                            {quantityVal}
                        </div>
                        <div
                            onClick={handleDecrement}
                            className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                        >
                            {/* <MdOutlineRemoveCircleOutline/> */}
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-start items-start md:flex-row md:justify-between md:items-center px-4">
                    <p className="text-lg font-semibold">{name}</p>
                    <p className="text-lg font-semibold">${price*quantityVal}</p>
                    <div className="hidden md:flex flex-row items-center gap-x-2 ">
                        <div
                            onClick={handleIncrement}
                            className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                        >
                            <IoIosAddCircleOutline  />
                        </div>
                        <div className="px-5 py-1 text-center bg-gray-100 rounded-xl pointer-events-none">
                            {quantityVal}
                        </div>
                        <div
                            onClick={handleDecrement}
                            className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                        >
                            {/* < MdOutlineRemoveCircleOutline/> */}
                        </div>
                    </div>
                </div>
            </div>
    );
}