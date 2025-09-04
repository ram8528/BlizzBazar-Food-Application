import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Delicious Meals, Delivered Fast</h2>
        <p>
          Craving something tasty? Discover your favorite dishes from top
          restaurants near you, all in one place. Fast, fresh, and full of
          flavor — your perfect meal is just a few clicks away.
        </p>
        <button
          className="shimmer-button"
          onClick={() => {
            const menuSection = document.getElementById("explore-menu");
            if (menuSection) {
              menuSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
