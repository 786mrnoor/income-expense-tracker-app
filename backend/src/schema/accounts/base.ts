import z from "zod";
import { objectIdSchema } from "@/lib/zod.js";
import { userBaseSchema } from "../users/base.js";

export const accountBaseSchema = z.object({
  id: objectIdSchema.brand('AccountId'),

  userId: userBaseSchema.shape.id,

  name: z.string("Please enter your account name")
    .trim().toUpperCase()
    .min(3, "Name must be at least 3 characters long"),
  
  balance: z.int("Please enter a valid amount")
});

export type AccountBaseSchema = z.infer<typeof accountBaseSchema>;