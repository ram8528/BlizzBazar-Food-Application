import express from "express";
import {
  deleteOrder,
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";

const orderRouter = express.Router();

// Customer routes
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);

// Admin routes
orderRouter.get("/list", adminMiddleware, listOrders);
orderRouter.post("/status", adminMiddleware, updateStatus);
orderRouter.post("/delete", adminMiddleware, deleteOrder);

export default orderRouter;
