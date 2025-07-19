// backend/middleware/authMiddleware.js

import { verifyToken } from "../config/jwt.js"
import User from "../models/User.js"

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

  try {
    const verified = verifyToken(token);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admins only" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


