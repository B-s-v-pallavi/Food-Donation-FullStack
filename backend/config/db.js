import mongoose from "mongoose";
import dotenv from "dotenv";

// Load .env from the backend folder (make sure the path is correct)
dotenv.config({ path: "./.env" });

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URL; // Make sure this matches your .env variable name
        if (!mongoURI) {
            throw new Error("MONGODB_URL not found in environment variables");
        }

        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

export default connectDB;
