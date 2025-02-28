const { useEffect, useState } = require("react");
const axios = require("axios");

const Cart = () => {
  const [products, setProducts] = useState([]);

  const fetchCart = async () => {
    const response = await axios.get("/api/cart");
    setProducts(response.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, action) => {
    const response = await axios.post(`/api/cart/update`, { id, action });
    setProducts(response.data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      <div className="space-y-4">
        {products.map((item) => (
          <div key={item.id} className="flex justify-between items-center border p-2 rounded">
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price} x {item.quantity}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => updateQuantity(item.id, "decrease")}
                className="px-2 py-1 bg-gray-300 rounded"
              >
                -
              </button>
              <span className="px-4">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, "increase")}
                className="px-2 py-1 bg-gray-300 rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

module.exports = Cart;
