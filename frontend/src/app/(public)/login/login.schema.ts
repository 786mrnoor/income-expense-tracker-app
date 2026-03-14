import z from "zod";
import { userBaseSchema } from "@/schemas/users/base";

export const loginSchema = userBaseSchema.pick({
  email: true,
  password: true
});

export type LoginSchema = z.infer<typeof loginSchema>;