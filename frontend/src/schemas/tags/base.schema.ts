import z from "zod";
import { userBaseSchema } from "../users/base.js";
import { objectIdSchema, timestampSchema } from "../common.schema.js";

export const tagBaseSchema = z.object({
  id: objectIdSchema.brand('TagId'),

  userId: userBaseSchema.shape.id,

  name: z.string("Please enter your tag name")
    .trim().toUpperCase()
    .min(3, "Name must be at least 3 characters long"),

  balance: z.int("Please enter a valid amount")
}).extend(timestampSchema);

export type TagBaseSchema = z.infer<typeof tagBaseSchema>;