import React, { useState } from "react";
import { FaPhoneFlip, FaSquareParking } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link,useNavigate } from "react-router-dom";
import {toast,ToastContainer} from "react-toastify"
import axios  from "axios";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

   const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:4000/api/auth/register",{
                username,email,phone,password
            });
            // localStorage.setItem("token",response.data.token)
            toast.success(response.data.message || "Signup successful")
            navigate("/")
        } catch (error) {
            console.log("Error in creating user",error)
            toast.error(error.response?.data?.message || "Signup failed")
        }
    }


  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('./assets/p6.jpg')] bg-gray-100 flex items-center justify-center p-4">
        <ToastContainer/>
      <div className=" shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-cyan-700 p-4 rounded-full">
            <FaSquareParking className="text-4xl text-white" />
          </div>
        </div>
        <h2 className="text-center text-2xl font-bold text-cyan-700 mb-4">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              name="username"
              required
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
            />
          </div>
          <div className="mb-4">
            <input
              name="email"
              required
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
            />
          </div>

          <div className="mb-4">
            <input
              name="phone"
              required
              type="text"
              placeholder="Phone number"
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
            />
          </div>

          <div className="mb-4 relative">
            <input
              name="password"
              required
              type={passwordVisible ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
            />
            {passwordVisible ? (
              <IoEyeOff
                className="text-xl text-gray-600 absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={() => setPasswordVisible((prev) => !prev)}
              />
            ) : (
              <IoEye
                className="text-xl text-gray-600 absolute right-4 top-1/2 transform -translate-y-1/2 "
                onClick={() => setPasswordVisible((prev) => !prev)}
              />
            )}
          </div>
          <button type="submit" className="w-full bg-cyan-700 text-white py-3 rounded-lg hover:bg-cyan-800 transition">
                Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link className="text-cyan-700 cursor-pointer" to={"/"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
