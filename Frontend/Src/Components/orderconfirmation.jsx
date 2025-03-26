import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const OrderConfirmation = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await axios.get("http://localhost:3000/api/your-orders", {
          params: { email },
        });
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Calculate total price
  const totalPrice = orders.length > 0 
  ? orders.reduce((total, order) => total + order.productId.price * order.quantity, 0) 
  : 0;

  const handlePaymentSuccess = async (orderId) => {
    try {
      await axios.post("http://localhost:3000/api/payment-success", { orderId });
      alert("Payment successful! Your order has been updated.");
      window.location.reload(); // Refresh page to update status
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert("Payment successful, but there was an issue updating the order.");
    }
  };

  


  return (
    <div>
      <h2>Order Confirmation</h2>
      {orders.length > 0 ? (
        <div>
          <h3>Shipping Address:</h3>
          <p>{orders[0].address}</p>

          <h3>Order Details:</h3>
{orders.map((order) => (
  <div key={order._id}>
    <p><strong>Product:</strong> {order.productId.name}</p>
    <p><strong>Quantity:</strong> {order.quantity}</p>
    <p><strong>Price:</strong> ${order.productId.price}</p>
    <p><strong>Shipping Address:</strong> {order.address}</p> {/* Address per order */}
  </div>
))}


          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

          <PayPalScriptProvider options={{ clientId: "AesbSTn6BlZlmWXw3VcNBuHOenIzlDH4beniwz-lY9p_JnzUTlrhLD_muyXJ6Kt-c0XtzmibOVN4h2OH" }}>
            <PayPalButtons
              style={{ layout: "horizontal" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{ amount: { value: totalPrice.toFixed(2) } }],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                alert("Payment successful!");

                // After payment, update backend order status
                orders.forEach(order => handlePaymentSuccess(order._id));

              }}
            >
              Pay with PayPal
            </PayPalButtons>
          </PayPalScriptProvider>
        </div>
      ) : (
        <p>Loading order details or no orders found...</p>
      )}
    </div>
  );
};

export default OrderConfirmation;