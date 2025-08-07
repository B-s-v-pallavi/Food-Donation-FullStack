// backend/index.js

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoute.js";

const app = express();

const __dirname = path.resolve();

dotenv.config();

connectDB();

if (process.env.NODE_ENV !== "production")  {
  app.use(cors({
    origin: "https://food-donation-fullstack.onrender.com",
    origin: "http://localhost:5173",
    credentials: true
  }));
}
app.use(express.json());




app.use("/api/auth", authRoutes);
app.use("/api/restaurant", restaurantRoutes);

// if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  
  // running the frontend from the server
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  })
// }


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
