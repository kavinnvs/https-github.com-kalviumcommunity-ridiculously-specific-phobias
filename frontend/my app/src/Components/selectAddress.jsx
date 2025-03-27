// Frontend - selectAddress.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectAddress = ({ userEmail }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/auth/get-addresses?email=${userEmail}`)
      .then((response) => {
        setAddresses(response.data.addresses);
      })
      .catch((error) => {
        console.error("Error fetching addresses", error);
      });
  }, [userEmail]);

  const handleSelect = (event) => {
    setSelectedAddress(event.target.value);
  };

  return (
    <div>
      <h2>Select Delivery Address</h2>
      <select onChange={handleSelect} value={selectedAddress}>
        <option value="">Select an address</option>
        {addresses.map((address, index) => (
          <option key={index} value={JSON.stringify(address)}>
            {address.address1}, {address.city}, {address.country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectAddress;