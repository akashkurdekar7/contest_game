import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection
const dbconn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected 💾");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1); // Exit with failure
  }
};
export default dbconn;
