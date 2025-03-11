
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SelectAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState(null); 
    const navigate = useNavigate();
    const email="a@gmail.com"
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user/get-addresses');
                
                const data = response.data;
                if (data && Array.isArray(data.addresses)) {
                    setAddresses(data.addresses);
                } else {
                    setAddresses([]);
                    console.warn('Unexpected response structure:', data);
                }
            } catch (err) {
                console.error('Error fetching addresses:', err);
                setError(err.response?.data?.message || err.message || 'An unexpected error occurred.');
            }
        };
        fetchAddresses();
    }, []);

    const handleSelectAddress = (addressId) => {
        navigate('/order-confirmation',{state:{addressId,email:email}});
    };

    return (
        <div className='w-full min-h-screen flex flex-col'>
            <div className='flex-grow flex justify-center items-center p-4'>
                <div className='w-full max-w-4xl border border-neutral-300 rounded-md flex flex-col p-6 bg-white shadow-md'>
                    <h2 className='text-2xl font-semibold mb-6 text-center'>Select Shipping Address</h2>
                    
                    {error && <p className='text-red-500 text-center'>{error}</p>} {/* 🔹 Display error */}

                    {addresses.length > 0 ? (
                        <div className='space-y-4 overflow-auto max-h-96'>
                            {addresses.map((address) => (
                                <div
                                    key={address._id}
                                    className='border p-4 rounded-md flex justify-between items-center hover:shadow-md transition-shadow'
                                >
                                    <div>
                                        <p className='font-medium'>
                                            {address.address1}
                                            {address.address2 ? `${address.address2}, ` : ''}{address.address1}, {address.city}, {address.state}, {address.zipCode}
                                        </p>
                                        <p className='text-sm text-gray-600'>{address.country}</p>
                                        <p className='text-sm text-gray-500'>Type: {address.addressType || 'N/A'}</p>
                                    </div>
                                    <button
                                        onClick={() => handleSelectAddress(address._id)}
                                        className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400'
                                    >
                                        Select
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-center text-gray-700'>No addresses found. Please add an address.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectAddress;