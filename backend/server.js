import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";
import { fileURLToPath } from "url";

// app config
const app = express();

// ✅ Take PORT & CLIENT_URL from .env
const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ middleware
// app.use(
//   cors({
//     origin: CLIENT_URL, // only your frontend
//     credentials: true,
//   })
// );
app.use(cors());

app.use(express.json());

// DB connection
connectDB();

// Static images
app.use("/images", express.static(path.join(__dirname, "uploads")));

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Backend running at: http://localhost:${PORT}`);
  console.log(`Allowed frontend: ${CLIENT_URL}`);
});
