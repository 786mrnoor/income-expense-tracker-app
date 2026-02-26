import z from "zod";
import { objectIdSchema } from "@/lib/zod.js";

export const userBaseSchema = z.object({
  id: objectIdSchema.brand('UserId'),

  name: z.string("Please enter your name")
    .trim().toUpperCase()
    .min(3, "Name must be at least 3 characters long"),

  email: z
    .email("Invalid email address")
    .trim().toLowerCase(),

  password: z.string("Please enter your password")
    .trim().min(8, "Password must be at least 8 characters long")
});

export type UserBaseSchema = z.infer<typeof userBaseSchema>;