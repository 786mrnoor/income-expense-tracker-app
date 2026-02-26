import z from "zod";
import { objectIdSchema } from "@/lib/zod.js";
import { userBaseSchema } from "../users/base.js";

export const tagBaseSchema = z.object({
  id: objectIdSchema.brand('TagId'),

  userId: userBaseSchema.shape.id,

  name: z.string("Please enter your tag name")
    .trim().toUpperCase()
    .min(3, "Name must be at least 3 characters long"),
});

export type TagBaseSchema = z.infer<typeof tagBaseSchema>;