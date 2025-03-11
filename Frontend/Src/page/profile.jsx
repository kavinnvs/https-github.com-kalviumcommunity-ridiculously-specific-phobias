import { useEffect, useState } from "react";
import { fetchUserProfile } from "../services/api";
import AddressCard from "../components/AddressCard";

export default function Profile() {
  const [personalDetails, setPersonalDetails] = useState({});
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchUserProfile("xyz@gmail.com").then((data) => {
      if (data) {
        setPersonalDetails(data.user);
        setAddresses(data.addresses);
      }
    });
  }, []);

  return (
    <div className="w-full h-max flex flex-col sm:flex-row p-5 gap-10">
      {/* Profile Picture Section */}
      <div className="w-40 h-max flex flex-col justify-center items-center gap-y-3">
        <div className="w-full h-max text-2xl text-neutral-100 text-left">
          PICTURE
        </div>
        <img
          src={
            personalDetails.avatarUrl
              ? `http:///${personalDetails.avatarUrl}`
              : `https://xyz.jpg`
          }
          alt="profile"
          className="w-40 h-40 rounded-full"
          onError={(e) => {
            e.target.onerror = null; // Prevents infinite loop if the default image also fail
            e.target.src = `https:.jpg`;
          }}
        />
      </div>

      {/* Personal Details Section */}


      <div className="h-max md:flex-grow">
        <div className="w-full h-max flex flex-col justify-center items-center gap-y-3">
          {[
            { label: "NAME", value: personalDetails.name },
            { label: "EMAIL", value: personalDetails.email },
            { label: "MOBILE", value: personalDetails.phoneNumber },
          ].map((item, index) => (
            <div key={index} className="w-full h-max">
              <div className="text-2xl text-neutral-100 text-left">
                {item.label}
              </div>
              <div className="text-lg font-light text-neutral-100 text-left break-all">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>



       {/* Address Section */}

      <div className="w-full h-max my-2 p-5">
        <h1 className="text-3xl text-neutral-100">Addresses</h1>
        <div className="w-full h-max p-5">
          <button
            className="w-max px-3 py-2 bg-neutral-600 text-neutral-100 rounded-md text-center hover:bg-neutral-100 hover:text-black transition-all duration-100"
            onClick={() => console.log("Add Address Clicked")}
          >
            Add Address
          </button>
        </div>

        {/* Display Addresses */}

        <div className="w-full h-max flex flex-col gap-5 p-5">
          {addresses.length === 0 ? (
            <div className="w-full h-max text-neutral-100 font-light text-left">
              No Addresses Found
            </div>
          ) : (
            addresses.map((address, index) => (
              <AddressCard key={index} {...address} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}