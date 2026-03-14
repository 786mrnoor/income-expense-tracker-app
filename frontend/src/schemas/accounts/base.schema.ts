import z from "zod";
import { objectIdSchema, timestampSchema } from "../common.schema.js";

export const accountBaseSchema = z.object({
  id: objectIdSchema.brand('accountId'),

  name: z.string("Please enter your account name")
    .trim().toUpperCase()
    .min(3, "Name must be at least 3 characters long"),

  balance: z.int("Please enter a valid amount")
}).extend(timestampSchema);

export type AccountBaseSchema = z.infer<typeof accountBaseSchema>;