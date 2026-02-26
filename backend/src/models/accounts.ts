import { toJSONPlugin } from "@/lib/toJSON.plugin.js";
import type { AccountBaseSchema } from "@/schema/accounts/base.js";
import mongoose, { Schema } from "mongoose";

export type IAccount = {
  _id?: AccountBaseSchema["id"];
  userId: AccountBaseSchema["userId"];
  name: AccountBaseSchema["name"];
  __v?: number;
}
const accountSchema = new Schema<IAccount>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  name: {
    type: String,
    trim: true,
    uppercase: true,
    min: 3,
    required: true
  }
});

accountSchema.plugin(toJSONPlugin); // remove __v and _id

accountSchema.index({ userId: 1, name: 1 }, { unique: true });

export const Account = mongoose.model<IAccount>("accounts", accountSchema);