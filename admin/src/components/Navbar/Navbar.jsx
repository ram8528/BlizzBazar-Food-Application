import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={assets.logonew} alt="" className="logo" />
      <img src={assets.profile_image} alt="" className="profile" />
    </div>
  );
};

export default Navbar;
