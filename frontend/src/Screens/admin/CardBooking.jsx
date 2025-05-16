import React from "react";
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const CardBooking = ({ booking, onApprove, onReject }) => {
  const { id, slot, status, user } = booking;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold">Spot ID: {slot.spotId}</h2>
      <p>User: {user?.username || 'Unknown User'}</p>
      <p>Email: {user?.email || 'No Email Provided'}</p>
      <div className="mt-2 flex items-center">
        {status === "pending" && <FaHourglassHalf className="text-yellow-500 mr-2" />}
        {status === "approved" && <FaCheckCircle className="text-green-500 mr-2" />}
        {status === "rejected" && <FaTimesCircle className="text-red-500 mr-2" />}
        <span>{status}</span>
      </div>
      {status === "pending" && (
        <div className="mt-4 flex gap-2">
          <button className="bg-green-600 text-white py-1 px-3 rounded" onClick={() => onApprove(id)}>
            Approve
          </button>
          <button className="bg-red-600 text-white py-1 px-3 rounded" onClick={() => onReject(id)}>
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default CardBooking;
