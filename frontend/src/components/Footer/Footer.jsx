import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="logo" src={assets.logonew} alt="BlizzBazar Logo" />
          <p>
            BlizzBazar is your one-stop destination for delicious meals from top local restaurants. 
            Fast delivery, quality food, and seamless experience — all at your fingertips.
            Order now and enjoy food made with love, delivered with care.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>How It Works</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>📞 +1-834-647-6232</li>
            <li>✉️ support@blizzbazar.com</li>
            <li>📍 123 Food Street, New York, NY</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
        © 2024 BlizzBazar. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
