import { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const userEmail = "user@example.com"; // Replace with actual user email (from auth)

    useEffect(() => {
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

        fetchOrders();
    }, []);

    return (
        <div>
            <h2>My Orders</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id}>
                            <p>Order ID: {order._id}</p>
                            <p>Total Price: ${order.totalPrice}</p>
                            <p>Status: {order.status}</p>
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
