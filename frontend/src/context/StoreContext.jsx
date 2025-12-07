import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { food_list as staticFoodList } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    toast.success("Logged out successfully ✅");
  };

  const addToCart = async (itemId) => {
    if (!token) {
      toast.error("Please login to add items to the cart");
      return;
    }
    let isFirstAdd = !cartItems[itemId];

    if (!cartItems || typeof cartItems !== "object") {
      console.warn("cartItems is not defined or invalid:", cartItems);
      return;
    }

    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    try {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
        // { headers: { token } }
      );

      if (isFirstAdd) {
        toast.success("Item added to the cart 🛒");
      } else {
        toast.info("Increased item quantity 🔼");
      }
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const currentQty = prev[itemId] || 0;
      if (currentQty <= 0) return prev;
      return { ...prev, [itemId]: currentQty - 1 };
    });

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.info("Item removed from the cart 🗑️");
      } catch (error) {
        toast.error("Failed to update cart on server");
        console.error("removeFromCart error:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.get(url + "/api/cart/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const cartData = response.data?.cartData;
      if (cartData && typeof cartData === "object") {
        setCartItems(cartData);
      } else {
        console.warn("Invalid cart data from API:", cartData);
        setCartItems({});
      }
    } catch (error) {
      console.error("Failed to load cart data:", error);
      setCartItems({});
      toast.error("Failed to load cart data. Please try again. ❌");
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  // on login load the current
  useEffect(() => {
    if (token) {
      loadCartData(token);
    }
  }, [token]);

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     setToken(localStorage.getItem("token"));
  //     loadCartData(localStorage.getItem("token"));
  //   }
  //   // ❌ fetchFoodList is no longer needed
  // }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    logout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
