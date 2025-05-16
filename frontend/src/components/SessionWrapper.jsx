import React from "react";
import { Navigate,Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const SessionWrapper = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to={"/"} />;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to={"/"} />;
    }

    const userRole = decoded.role; // Assuming the token contains a `role` field

    if (!allowedRoles.includes(userRole)) {
      return <Navigate to={"/unauthorized"} />;
    }

    return <Outlet/>;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to={"/"} />;
  }
};

export default SessionWrapper;
