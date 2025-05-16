import React, { useState } from "react";
import { FaSquareParking } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();



   const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      );
      const token = response.data.accessToken;
      localStorage.setItem("token", token);

      toast.success(response.data.message || "Login Successfully");

      const decode = jwtDecode(token);
      const userRole = decode.role

    if (userRole === "ADMIN") {
      navigate("/admin-dashboard");
    } else if (userRole === "USER") {
      navigate("/dashboard");
    } else {
      navigate("/unauthorized"); // Fallback or unauthorized route
    }

    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
    };

  return (
    <div className="min-h-screen bg-cover bg-center  bg-[url('./assets/p6.jpg')] bg-gray-100 flex items-center justify-center p-4">
        <ToastContainer/>
      <div className="bg-cyan-800 opacity-70 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-cyan-700 p-4 rounded-full">
            <FaSquareParking className="text-4xl text-white" />
          </div>
        </div>
        <h2 className="text-center text-2xl font-bold text-cyan-700 mb-4">
          Login
        </h2>
        <form onSubmit={handleLogin}>
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
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link className="text-cyan-700 cursor-pointer" to={"/signup"}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
