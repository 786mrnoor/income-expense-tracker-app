import { toJSONPlugin } from "@/lib/toJSON.plugin.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import mongoose, { Schema } from "mongoose";

export type IUser = {
  _id?: UserBaseSchema["id"];
  name: UserBaseSchema["name"];
  email: UserBaseSchema["email"];
  passwordHash: string;
  __v?: number;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
    uppercase: true,
    required: true,
    minlength: 3,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },

  passwordHash: {
    type: String,
    required: true,
  }
});

userSchema.plugin(toJSONPlugin); // remove __v and _id

userSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model<IUser>("users", userSchema);