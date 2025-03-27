import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddressForm = () => {
  const navigate = useNavigate();
  const [addressData, setAddressData] = useState({
    country: "",
    city: "",
    address1: "",
    address2: "",
    zipCode: "",
    addressType: "",
  });

  const email = "user@example.com"; // Replace with dynamic email if needed

  const handleChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/update-address", {
        email,
        address: addressData,
      });
      alert("Address updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Add Address</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="country" placeholder="Country" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        <input type="text" name="address1" placeholder="Address Line 1" onChange={handleChange} required />
        <input type="text" name="address2" placeholder="Address Line 2" onChange={handleChange} />
        <input type="text" name="zipCode" placeholder="Zip Code" onChange={handleChange} required />
        <input type="text" name="addressType" placeholder="Address Type (Home/Office)" onChange={handleChange} required />
        <button type="submit">Save Address</button>
      </form>
    </div>
  );
};

export default AddressForm;