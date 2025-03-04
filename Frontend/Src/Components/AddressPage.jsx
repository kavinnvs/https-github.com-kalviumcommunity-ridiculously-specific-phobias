import { useState, useEffect } from "react";

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/api/addresses") // Replace with actual API endpoint
      .then((res) => res.json())
      .then((data) => setAddresses(data))
      .catch((err) => console.error("Error fetching addresses:", err));
  }, []);

  const handleAddAddress = async () => {
    if (!newAddress.trim()) return;
    
    const response = await fetch("/api/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: newAddress }),
    });

    if (response.ok) {
      const addedAddress = await response.json();
      setAddresses([...addresses, addedAddress]);
      setNewAddress("");
      setShowForm(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4">My Addresses</h2>
      {addresses.length > 0 ? (
        <ul>
          {addresses.map((addr, index) => (
            <li key={index} className="border-b py-2">{addr}</li>
          ))}
        </ul>
      ) : (
        <p>No address found.</p>
      )}
      <button 
        onClick={() => setShowForm(true)} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Address
      </button>
      {showForm && (
        <div className="mt-4">
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Enter new address"
          />
          <button 
            onClick={handleAddAddress} 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save Address
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressPage;
