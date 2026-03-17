import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    mongoose.set('autoIndex', false);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}