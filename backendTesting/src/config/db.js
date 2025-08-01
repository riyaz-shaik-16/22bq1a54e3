import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const connectDb = async () => {
  const url = process.env.MONGODB_URI;

  if (!url) {
    throw new Error("MONGO_URI is not defined in enviroment variables");
  }

  try {
    await mongoose.connect(url, {
      dbName: "Chatappmicroserviceapp",
    });
    console.log("Connected to mongodb");
  } catch (error) {
    console.error("Failed to connect to Mongodb", error);
    process.exit(1);
  }
};

export default connectDb;