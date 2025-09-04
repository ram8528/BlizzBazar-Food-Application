import React, { useState } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  const [search, setSearch] = useState("");

  // Filter menu by search
  const filteredMenu = menu_list.filter((item) =>
    item.menu_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCategoryClick = (menuName) => {
    setCategory((prev) => (prev === menuName ? "All" : menuName));

    // Optional: scroll to menu/food items section
    const element = document.getElementById("food-display");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Discover a wide range of cuisines — from classic comfort foods to
        exciting new flavors. Whether you're craving something spicy, sweet,
        or healthy, we’ve got you covered!
      </p>

      <input
        type="text"
        placeholder="Search categories..."
        className="menu-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="explore-menu-list">
        {filteredMenu.length === 0 ? (
          <p className="no-results">No categories found.</p>
        ) : (
          filteredMenu.map((item, index) => (
            <div
              key={index}
              className={`explore-menu-list-item ${
                category === item.menu_name ? "selected" : ""
              }`}
              onClick={() => handleCategoryClick(item.menu_name)}
              title={`View ${item.menu_name} items`}
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
            </div>
          ))
        )}
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
