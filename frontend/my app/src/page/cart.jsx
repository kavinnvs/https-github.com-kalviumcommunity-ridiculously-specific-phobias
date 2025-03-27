import { useState, useEffect } from "react";
import CartProduct from "../Components/cartCompo"; // Ensure correct import

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/cart") // Change this URL if needed
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error fetching cart data");
                }
                return res.json();
            })
            .then((data) => {
                setProducts(
                    data.cart.map((product) => ({
                        quantity: product.quantity,
                        ...product.productId,
                    }))
                );
                console.log("Products fetched:", data.cart);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="w-full h-screen">
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-full md:w-4/5 lg:w-4/6 2xl:w-2/3 h-full border-l border-r border-neutral-300 flex flex-col">
                    <div className="w-full h-16 flex items-center justify-center">
                        <h1 className="text-2xl font-semibold">Cart</h1>
                    </div>
                    <div className="w-full flex-grow overflow-auto px-3 py-2 gap-y-2">
                        {loading ? (
                            <p className="text-center text-lg font-semibold">Loading...</p>
                        ) : products.length > 0 ? (
                            products.map((product) => <CartProduct key={product._id} {...product} />)
                        ) : (
                            <p className="text-center text-lg font-semibold">Your cart is empty.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;