import express from "express";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import adminMiddleware from "../middleware/admin.js";  // 👈 ADD THIS

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads")); // ✅ go up one level to project root
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

// ⬇️ ROUTES

// Only admin can add food
foodRouter.post(
  "/add",
  adminMiddleware,             // 👈 check admin first
  upload.single("image"),      // 👈 then handle file
  addFood                      // 👈 then controller
);

// Anyone can see food list (frontend)
foodRouter.get("/list", listFood);

// Only admin can remove food
foodRouter.post("/remove", adminMiddleware, removeFood);

export default foodRouter;
