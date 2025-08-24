import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // from middleware
    const itemId = req.body.itemId;

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required",
      });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Added to cart",
    });
  } catch (error) {
    console.log("addToCart error:", error);
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
    });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const itemId = req.body.itemId;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = userData.cartData || {};

    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;

      // Optional: remove item if quantity becomes 0
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }

      await userModel.findByIdAndUpdate(userId, { cartData });

      res.json({
        success: true,
        message: "Removed from cart",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Item not in cart or quantity is already zero",
      });
    }
  } catch (error) {
    console.log("removeFromCart error:", error);
    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
    });
  }
};

// Get user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = userData.cartData || {};

    res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.log("getCart error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
    });
  }
};

export { addToCart, removeFromCart, getCart };
