import mongoose, { Schema } from "mongoose";
import { toJSONPlugin } from "@/lib/toJSON.plugin.js";
import type { TagBaseSchema } from "@/schema/tags/base.js";

export type ITag = {
  _id?: TagBaseSchema["id"];
  userId: TagBaseSchema["userId"];
  name: TagBaseSchema["name"];
  __v?: number;
}
const tagSchema = new Schema<ITag>({
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

tagSchema.plugin(toJSONPlugin); // remove __v and _id

tagSchema.index({ userId: 1, name: 1 }, { unique: true });

export const Tag = mongoose.model<ITag>("tags", tagSchema);