import React ,{useState}from 'react';
import { MdLocalParking } from 'react-icons/md';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';
import { FaCar, FaInfoCircle, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa6";

const CardSlot = ({ id,spotId, status, price,type,location, onAction }) => {
  const statusColors = {
    Available: 'bg-green-100 text-green-600',
    pending: 'bg-yellow-100 text-yellow-600',
    unavailable: 'bg-red-100 text-red-600',
  };

  const statusIcons = {
    Available: <BsCheckCircle className="text-green-600" />,
    pending: <FaHourglassHalf className="text-yellow-600" />,
    unavailable: <BsXCircle className="text-red-600" />,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

   const handleBookClick = () => {
    setIsModalOpen(true);
  };


  const handleConfirmBooking = () => {
    onAction(id);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-[275px] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center mb-2">
        <FaCar className="text-cyan-600 mr-2" />
        <h2 className="font-bold text-xl">{spotId}</h2>
      </div>
        <div className={`flex items-center gap-2 px-2 py-1 rounded-lg ${statusColors[status]}`}> 
          {statusIcons[status]}
          <span className="text-sm font-medium">{status}</span>
        </div>
      </div>
      <div className="text-gray-700 font-semibold">Price: {price}/hr</div>
      <button 
        className={`py-2 px-4 rounded-lg text-white ${status === 'Booked' ? 'bg-gray-400' : 'bg-cyan-600 hover:bg-cyan-700'}`} 
        disabled={status === 'Booked'}
        onClick={handleBookClick}
      >
        {status === 'Booked' ? 'Booked' : 'Book Slot'}
      </button>

     {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="font-bold text-lg mb-2">Confirm Booking</h3>
            <p><strong>Spot ID:</strong> {spotId}</p>
            <p><strong>Type:</strong> {type}</p>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Price:</strong> {price}/hr</p>

            <div className="flex justify-end mt-4">
              <button 
                className="bg-gray-300 py-1 px-3 rounded mr-2" 
                onClick={() => setIsModalOpen(false)}
              >Cancel</button>
              <button 
                className="bg-cyan-600 text-white py-1 px-3 rounded" 
                onClick={handleConfirmBooking}
              >Confirm</button>
            </div>
          </div>
        </div>
      )}
     

    </div>
  );
};

export default CardSlot;