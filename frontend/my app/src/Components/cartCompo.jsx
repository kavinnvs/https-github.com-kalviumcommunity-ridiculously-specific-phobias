import React, { useState, useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";


export default function CartProduct({ _id, email, images = [], quantity, price, name }) {
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
        const newQuantity = quantityVal + 1;
        setQuantityVal(newQuantity);
        updateQuantity(newQuantity);
    };

    const handleDecrement = () => {
        const newQuantity = quantityVal > 1 ? quantityVal - 1 : 1;
        setQuantityVal(newQuantity);
        updateQuantity(newQuantity);
    };

    const updateQuantity = (newQuantity) => {
        fetch("http://localhost:5000/api/cart/update-quantity", { // Change URL if needed
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                productId: _id,
                quantity: newQuantity,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error updating quantity");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Quantity updated:", data);
            })
            .catch((err) => {
                console.error("Error updating quantity:", err);
            });
    };

    const currentImage = images.length > 0 ? images[currentIndex] : "default-image.jpg"; // Replace with a default image if empty

    return (
        <div className="h-max w-full p-4 flex justify-between border-b border-neutral-300 bg-neutral-100 rounded-lg">
            <div className="flex flex-col gap-y-2">
                <img
                    src={currentImage}
                    alt={name}
                    className="w-32 h-32 object-cover rounded-lg border border-neutral-300"
                />
                <div className="flex flex-row items-center gap-x-2 md:hidden">
                    <button onClick={handleIncrement} className="p-2 rounded-xl bg-gray-200 hover:bg-gray-300 active:translate-y-1">
                        <IoIosAddCircleOutline />
                    </button>
                    <div className="px-5 py-1 text-center bg-gray-100 rounded-xl">{quantityVal}</div>
                    <button onClick={handleDecrement} className="p-2 rounded-xl bg-gray-200 hover:bg-gray-300 active:translate-y-1">
                        Decreament
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-col justify-start items-start md:flex-row md:justify-between md:items-center px-4">
                <p className="text-lg font-semibold">{name}</p>
                <p className="text-lg font-semibold">${price * quantityVal}</p>
                <div className="hidden md:flex flex-row items-center gap-x-2">
                    <button onClick={handleIncrement} className="p-2 rounded-xl bg-gray-200 hover:bg-gray-300 active:translate-y-1">
                        <IoIosAddCircleOutline />
                    </button>
                    <div className="px-5 py-1 text-center bg-gray-100 rounded-xl">{quantityVal}</div>
                    <button onClick={handleDecrement} className="p-2 rounded-xl bg-gray-200 hover:bg-gray-300 active:translate-y-1">
                        <MdOutlineRemoveCircleOutline />
                    </button>
                </div>
            </div>
        </div>
    );
}