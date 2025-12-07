// src/components/ProtectedRoute.jsx
import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const ProtectedRoute = ({ children, openLogin }) => {
  const { token } = useContext(StoreContext);
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      // just open the login popup; safe to call here
      openLogin(true);
    }
  }, [token, openLogin]);

  if (!token) {
    // block route and send user to home (or you can choose /login)
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
