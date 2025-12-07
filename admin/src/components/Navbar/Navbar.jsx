import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ setAdminToken }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken("");
    toast.success("Logged out successfully 👋");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <img
        src={assets.logonew}
        onClick={() => navigate("/")}
        alt=""
        className="logo"
      />

      {/* Profile + Dropdown */}
      <div className="profile-section">
        <img
          src={assets.profile_image}
          alt="admin profile"
          className="profile"
          onClick={() => setOpenMenu(!openMenu)}
        />

        {openMenu && (
          <div className="dropdown-menu">
            <p onClick={() => navigate("/")}>Dashboard</p>
            <p onClick={() => navigate("/orders")}>Orders</p>
            <hr />
            <p onClick={handleLogout} className="logout">
              Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
