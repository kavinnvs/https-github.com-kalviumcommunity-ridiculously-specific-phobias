import { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const userEmail = "user@example.com"; // Replace with actual user email from authentication

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:5000/my-orders", {
                params: { email: userEmail },
            });
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const cancelOrder = async (orderId) => {
        try {
            await axios.put(`http://localhost:5000/cancel-order/${orderId}`);
            alert("Order canceled successfully!");
            fetchOrders(); // Refresh the order list
        } catch (error) {
            console.error("Error canceling order:", error);
            alert("Failed to cancel order");
        }
    };

    return (
        <div>
            <h2>My Orders</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                            <p><strong>Status:</strong> {order.status}</p>

                            {/* Show Cancel Order button only if order is not already canceled */}
                            {order.status !== "Canceled" && (
                                <button 
                                    onClick={() => cancelOrder(order._id)} 
                                    style={{ backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}>
                                    Cancel Order
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default MyOrders;
