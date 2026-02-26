import mongoose from "mongoose";
import { Schema } from "mongoose";

import type { UserBaseSchema } from "@/schema/users/base.js";
import type { Brand } from "@/types/utils.js";
import { toJSONPlugin } from "@/lib/toJSON.plugin.js";

export type SessionId = Brand<mongoose.Types.ObjectId, "SessionId">;

export type ISession = {
  _id?: SessionId;
  userId: UserBaseSchema["id"];
  refreshTokenHash?: string;
  userAgent?: string;
  ip?: string;
  expiresAt?: Date;
  __v?: number;
}

const sessionSchema = new Schema<ISession>({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  refreshTokenHash: String,
  userAgent: String,
  ip: String,
  expiresAt: Date,
});

sessionSchema.plugin(toJSONPlugin); // remove __v and _id

sessionSchema.index({ userId: 1 });

export const Session = mongoose.model<ISession>("sessions", sessionSchema);