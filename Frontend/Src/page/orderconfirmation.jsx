import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addressId, email } = location.state || {};
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to COD

    useEffect(() => {
        if (!addressId || !email) {
            navigate('/select-address'); // Redirect if no address selected
            return;
        }
        const fetchData = async () => {
            try {
                // Fetch selected address
                const addressResponse = await axios.get('http://localhost:3000/user/get-address');
                if (addressResponse.status !== 200) {
                    throw new Error(`Failed to fetch addresses. Status: ${addressResponse.status}`);
                }
                const addressData = addressResponse.data;
                const address = addressData.addresses.find(addr => addr._id === addressId);
                if (!address) {
                    throw new Error('Selected address not found.');
                }
                setSelectedAddress(address);

                // Fetch cart products
                const cartResponse = await axios.get('http://localhost:3000/product/getcart', {
                    params: { email: email },
                });
                if (cartResponse.status !== 200) {
                    throw new Error(`Failed to fetch cart products. Status: ${cartResponse.status}`);
                }
                const cartData = cartResponse.data;
                const processedCartItems = cartData.cart.map(item => ({
                    _id: item.productId._id,
                    name: item.productId.name,
                    price: item.productId.price,
                    images: item.productId.images.map(imagePath => `http://localhost:3000${imagePath}`),
                    quantity: item.quantity,
                }));
                setCartItems(processedCartItems);
                setTotalPrice(processedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.response?.data?.message || err.message || 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [addressId, email, navigate]);

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3000/order/place', {
                email,
                addressId,
                paymentMethod, // Include payment method in request
            });
            if (response.status !== 200 && response.status !== 201) {
                throw new Error(response.data.message || 'Failed to place order.');
            }
            navigate('/order-success', { state: { order: response.data.order } });
        } catch (err) {
            console.error('Error placing order:', err);
            setError(err.response?.data?.message || err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <p className='text-lg'>Processing...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='w-full h-screen flex flex-col justify-center items-center'>
                <p className='text-red-500 text-lg mb-4'>Error: {error}</p>
                <button onClick={() => window.location.reload()} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className='w-full min-h-screen flex flex-col'>
            <div className='flex-grow flex justify-center items-start p-4'>
                <div className='w-full max-w-4xl border border-neutral-300 rounded-md flex flex-col p-6 bg-white shadow-md'>
                    <h2 className='text-2xl font-semibold mb-6 text-center'>Order Confirmation</h2>

                    {/* Selected Address */}
                    <div className='mb-6'>
                        <h3 className='text-xl font-medium mb-2'>Shipping Address</h3>
                        {selectedAddress ? (
                            <div className='p-4 border rounded-md'>
                                <p className='font-medium'>{selectedAddress.address1}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.zipCode}</p>
                                <p className='text-sm text-gray-600'>{selectedAddress.country}</p>
                            </div>
                        ) : (
                            <p>No address selected.</p>
                        )}
                    </div>

                    {/* Cart Items */}
                    <div className='mb-6'>
                        <h3 className='text-xl font-medium mb-2'>Cart Items</h3>
                        {cartItems.length > 0 ? (
                            <div className='space-y-4'>
                                {cartItems.map((item) => (
                                    <div key={item._id} className='flex justify-between items-center border p-4 rounded-md'>
                                        <div className='flex items-center'>
                                            <img src={item.images[0] || '/default-avatar.png'} alt={item.name} className='w-16 h-16 object-cover rounded-md mr-4' />
                                            <div>
                                                <p className='font-medium'>{item.name}</p>
                                                <p className='text-sm text-gray-600'>Quantity: {item.quantity}</p>
                                                <p className='text-sm text-gray-600'>Price: ${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <p className='font-semibold'>${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>

                    {/* Total Price */}
                    <div className='mb-6 flex justify-end'>
                        <p className='text-xl font-semibold'>Total: ${totalPrice.toFixed(2)}</p>
                    </div>

                    {/* Payment Method */}
                    <div className='mb-6'>
                        <h3 className='text-xl font-medium mb-2'>Payment Method</h3>
                        <div className='p-4 border rounded-md'>
                            <label className='block mb-2'>
                                <input type='radio' value='COD' checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className='mr-2' />
                                Cash on Delivery (COD)
                            </label>
                            <label className='block'>
                                <input type='radio' value='Online' checked={paymentMethod === 'Online'} onChange={() => setPaymentMethod('Online')} className='mr-2' />
                                Online Payment (PayPal)
                            </label>
                        </div>
                    </div>

                    {/* PayPal Button Placeholder */}
                    {paymentMethod === 'Online' && (
                        <div className='mb-6'>
                            <p className='text-center text-gray-600'>PayPal Button will be here</p>
                        </div>
                    )}

                    {/* Place Order Button */}
                    <div className='flex justify-center'>
                        <button onClick={handlePlaceOrder} className='bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors'>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
