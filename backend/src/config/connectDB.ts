import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  if (mongoose.connections[0].readyState) {
    isConnected = true;
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI!);
    isConnected = db.connections[0].readyState === 1;
    mongoose.set("autoIndex", false);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
