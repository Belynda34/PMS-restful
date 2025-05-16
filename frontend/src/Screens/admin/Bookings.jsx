import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import CardBooking from "./CardBooking";
import { FaSearch } from "react-icons/fa";
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Bookings = () => {


    const [username,setUsername] = useState("Loading...")
    const [bookings, setBookings] = useState([]);

    const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
};

   
    
  const fetchUserProfile = async () => {
    try {
    
      const response = await axios.get(
        "http://localhost:4000/api/auth/users/current",
        {
         headers
        }
      );
      setUsername(response.data.username);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const fetchBookings = async () => {
    try {
    
   
      const response = await axios.get("http://localhost:4000/api/booking",{
        headers
      },);  
      console.log("Data:",response.data)
      setBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
      toast.error("Failed to fetch bookings.");
    }
  };

   const handleApprove = async (bookingId) => {
    try {
  
      const response = await axios.patch(`http://localhost:4000/api/booking/approve/${bookingId}`,{},{headers},);
      toast.success(response.data.message);
      fetchBookings(); // Refresh bookings after approval
    } catch (error) {
      console.error("Error approving booking:", error.message);
      toast.error("Failed to approve booking.");
    }
  };



  const handleReject = async (bookingId) => {
    try {
      
      const response = await axios.patch(`http://localhost:4000/api/booking/reject/${bookingId}`,{},{headers},);
      toast.error(response.data.message);
      fetchBookings(); // Refresh bookings after rejection
    } catch (error) {
      console.error("Error rejecting booking:", error.message);
      toast.error("Failed to reject booking.");
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchUserProfile();
  }, []);



  return (
    <>
      <div className="min-h-screen p-5">
        <div className="flex items-center space-x-4 mb-10">
          <div className="w-12 h-12 bg-cyan-700 rounded-full flex items-center justify-center text-white font-semibold">
            {username.charAt(0).toUpperCase()}
          </div>
          <span className="text-lg font-semibold text-gray-700">
            Hi,{username}
          </span>
        </div>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl text-cyan-600 font-semibold">
            Available slots
          </h2>
          <div className="relative flex items-center w-64">
            <input
              type="text"
              placeholder="Search slots..."
            //   onChange={handleSearchChange}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            <FaSearch className="absolute right-3 text-cyan-700" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.length === 0 ? (
          <p>No bookings available</p>
        ) : (
          bookings.map((booking) => (
            <CardBooking
              key={booking.id}
              booking={booking}
              status={booking.status}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />


      </div>
    </>
  );
};

export default Bookings;
