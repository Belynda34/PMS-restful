import React from "react";
import CardSlot from "../components/CardSlot";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from "react-icons/fa";

const Slots = () => {
    
  const [username, setUsername] = useState("Loading...");
  const [slots, setSlots] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchSlots = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await axios.get("http://localhost:4000/api/slots", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      setSlots(response.data.slots);
    } catch (error) {
      console.error("Error fetching slots:", error.message);
      throw error;
    }
  };

  const handleBooking = async (slotId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.post(
        "http://localhost:4000/api/booking/book",
        { slotId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    //   if (response.status === 201) {
    //     console.log("Booking confirmed:", response.data);
    //     fetchSlots();
    //   }
      console.log("Booking confirmed:", response.data);
      toast.success("Booking confirmed successfully! 🎉");
      fetchSlots(); // Refresh the slots
    } catch (error) {
        toast.error(`${error.response?.data?.error || error.message}`);
        console.error("Error in requesting booking:",error)
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:4000/api/auth/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      setUsername(response.data.username);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter slots based on searchQuery
  const filteredSlots = slots.filter((slot) =>
    slot.spotId.toString().includes(searchQuery.trim())
  )

   useEffect(() => {
    fetchSlots(),
    fetchUserProfile()
  }, []);

  return (
    <>
    <div className="min-h-screen p-5">
    
     <div className="flex items-center space-x-4 mb-10">
        <div className="w-12 h-12 bg-cyan-700 rounded-full flex items-center justify-center text-white font-semibold">
          {username.charAt(0).toUpperCase()}
        </div>
        <span className="text-lg font-semibold text-gray-700">Hi,{username}</span>
    </div>
    <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl text-cyan-600 font-semibold">Available slots</h2>
          <div className="relative flex items-center w-64">
            <input
              type="text"
              placeholder="Search slots..."
              onChange={handleSearchChange}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            <FaSearch className="absolute right-3 text-cyan-700" />
          </div>
    </div>

    <div className="grid grid-cols-4 gap-4">
          {filteredSlots.length > 0 ? (
            filteredSlots.map((slot) => (
              <CardSlot
                key={slot.id}
                id={slot.id}
                spotId={slot.spotId}
                status={slot.status}
                price={slot.price}
                type={slot.type}
                location={slot.location}
                onAction={handleBooking}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-4 text-center">
              No slots found for Spot ID: {searchQuery}
            </p>
          )}
          <ToastContainer position="top-right" autoClose={3000} />
    </div>
     {/* <div className="grid grid-cols-4 gap-4 ">
      {slots.map((slot) => (
        <CardSlot
          key={slot.id}
          id={slot.id}
          spotId={slot.spotId}
          status={slot.status}
          price={slot.price}
          type={slot.type}
          location={slot.location}
          onAction={handleBooking}
        />
      ))}
      <ToastContainer position="top-right" autoClose={3000} />
    </div> */}
    </div>
    </>
    
  );
};

export default Slots;
