import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URL) {
  console.error(" MongoDB URL missing in .env file");
  process.exit(1);
}

const connectDatabase = async () => {
  try {
    const data = await mongoose.connect(process.env.MONGODB_URL);
    console.log(` MongoDB connected: ${data.connection.host}`);
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDatabase;
