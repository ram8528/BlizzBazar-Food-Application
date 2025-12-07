import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute openLogin={setShowLogin}>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order"
            element={
              <ProtectedRoute openLogin={setShowLogin}>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/myorders"
            element={
              <ProtectedRoute openLogin={setShowLogin}>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          <Route path="/verify" element={<Verify />} />
        </Routes>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
