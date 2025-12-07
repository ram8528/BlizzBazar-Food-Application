import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Order from "./pages/Orders/Order";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const url = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const [adminToken, setAdminToken] = useState(
    () => localStorage.getItem("adminToken") || ""
  );

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <ToastContainer />

      {!isLoginPage && <Navbar setAdminToken={setAdminToken} />}
      {!isLoginPage && <hr />}

      <div className={isLoginPage ? "app-content login-layout" : "app-content"}>
        {!isLoginPage && <Sidebar />}

        <Routes>
          <Route
            path="/login"
            element={<AdminLogin url={url} setAdminToken={setAdminToken} />}
          />

          <Route
            path="/"
            element={
              <AdminProtectedRoute adminToken={adminToken}>
                <Dashboard url={url} adminToken={adminToken} />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <AdminProtectedRoute adminToken={adminToken}>
                <Add url={url} adminToken={adminToken} />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/list"
            element={
              <AdminProtectedRoute adminToken={adminToken}>
                <List url={url} adminToken={adminToken} />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <AdminProtectedRoute adminToken={adminToken}>
                <Order url={url} adminToken={adminToken} />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
