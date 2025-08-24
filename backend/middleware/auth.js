import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized Login again",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.body.userId = token_Decode.id;

    // ✅ Use req.userId instead of modifying req.body
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error",
    });
  }
};

export default authMiddleware;
