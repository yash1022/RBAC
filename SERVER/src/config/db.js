import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error("MongoDB connection failed", { error: error.message, stack: error.stack });
    process.exit(1);
  }
};

export default connectDB;