import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddressPage = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/addresses", { withCredentials: true })
            .then(response => setAddresses(response.data))
            .catch(error => console.error("Error fetching addresses:", error));
    }, []);

    const handleConfirm = () => {
        if (!selectedAddress) {
            alert("Please select an address");
            return;
        }
        navigate("/order-summary", { state: { selectedAddress } });
    };

    return (
        <div>
            <h2>Select Delivery Address</h2>
            {addresses.map((address) => (
                <div key={address._id}>
                    <input 
                        type="radio" 
                        name="address" 
                        value={address._id}
                        onChange={() => setSelectedAddress(address)}
                    />
                    <label>{address.street}, {address.city}, {address.zipcode}</label>
                </div>
            ))}
            <button onClick={handleConfirm} className="bg-green-500 text-white px-4 py-2 mt-4">
                Confirm Address
            </button>
        </div>
    );
};

export default AddressPage;
