import type z from "zod";
import { userBaseSchema } from "../users/base";

export const signupResponseSchema = userBaseSchema.pick({
  name: true,
  email: true,
});

export type SignupResponseSchema = z.infer<typeof signupResponseSchema>;