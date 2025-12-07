import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user || !user.isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "Admin access only" });
    }

    req.userId = user._id;
    req.isAdmin = true;

    next();
  } catch (error) {
    console.log("adminMiddleware error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default adminMiddleware;
