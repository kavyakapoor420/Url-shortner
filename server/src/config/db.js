import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    // const connection = await mongoose.connect(process.env.MONGO_URI);
    const connection = await mongoose.connect("mongodb://localhost:27017/url-shortener");
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
