import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/frontend_assets/assets";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <div className="app-download-content">
        <h2>Get the BlizzBazar App</h2>
        <p>
          Enjoy faster ordering, exclusive app-only deals, real-time order tracking, and a smoother experience — all in one app.
        </p>
        <div className="app-download-platforms">
          <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
            <img src={assets.play_store} alt="Download on Play Store" />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <img src={assets.app_store} alt="Download on App Store" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
