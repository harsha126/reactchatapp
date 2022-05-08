import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const ProtectedRoute = ({ children }) => {
  const  curruser  = useAuth();
  if (!curruser) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
