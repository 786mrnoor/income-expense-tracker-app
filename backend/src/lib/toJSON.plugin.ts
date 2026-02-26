import { Schema } from "mongoose";

export function toJSONPlugin(schema: Schema) {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false, // remove __v
    transform(_, ret) {
      delete ret._id;
    },
  });

  schema.set("toObject", {
    virtuals: true,
    versionKey: false,
    transform(_, ret) {
      delete ret._id;
    },
  });
}