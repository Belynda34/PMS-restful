import React, { useState } from "react";
import { BsList } from "react-icons/bs";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";

const SidebarA = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const location = useLocation();

  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsSidebarOpen(false); // close sidebar on mobile after selection
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/')
}



  const menuItems = [
    { icon: <MdDashboard className="text-2xl text-cyan-700" />, text: "Dashboard", to: "/admin-dashboard" },
    // {icon: <IoIosAddCircle className="text-2xl text-cyan-700"/>,text:'Add Employee'},
    { icon: <CiLogout className="text-2xl text-cyan-700" onClick={handleLogout}/>, text: "Logout",to:'/' },
    
  ];

  return (
    <>
      {/* Toggle Button - Mobile */}
      <button
        className="bg-cyan-700 p-2 m-4 rounded-xl md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <BsList className="text-3xl text-white" />
      </button>

      {/* Backdrop on Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 white bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white h-full min-h-full w-72 shadow-xl py-10 px-4 flex flex-col fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:h-screen`}
      >
        <h1 className="text-2xl font-bold text-cyan-700 mb-10">Parking System </h1>
        <nav className="flex flex-col gap-6">
          {menuItems.map((item) => (
          <Link
          key={item.text}
          to={item.to} 
          className={`flex items-center gap-4 text-lg px-4 py-2 rounded-md transition-colors ${
            location.pathname === item.to || selectedItem === item.text
              ? "bg-cyan-700 text-white"
              : "text-gray-700 hover:bg-cyan-100"
          }`}
          onClick={() => {
            if (item.text === "Logout") {
              handleLogout();
            } else {
              handleItemClick(item.text);
              navigate(item.to);
            }
          }}
        >
          {item.icon}
          {item.text}
        </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SidebarA;
