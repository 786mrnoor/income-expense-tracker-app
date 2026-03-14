import z from "zod";
import { userBaseSchema } from "@/schemas/users/base";

export const signupSchema = userBaseSchema.pick({
  name: true,
  email: true,
  password: true
});

export type SignupSchema = z.infer<typeof signupSchema>;