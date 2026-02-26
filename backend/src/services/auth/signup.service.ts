import { User, type IUser } from "@/models/users.js";
import type { CreateSignUpSchema } from "@/schema/auth/signup.js";
import { AppError } from "@/utils/appError.js";
import { response } from "@/utils/appResponse.js";
import bcrypt from "bcryptjs";

export default async function signupService(data: CreateSignUpSchema["body"]) {
  try {
    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = new User({
      name: data.name,
      email: data.email,
      passwordHash,
    } satisfies IUser);
    await user.save();

    return response(201, {
      _id: user._id,
      name: user.name,
      email: user.email,
    }, "User created successfully");

  } catch (error: any) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      throw new AppError(409, "Email already exists");
    }
    throw error;
  }
};
