import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
}
