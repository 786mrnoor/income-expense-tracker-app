import z from "zod";
import { userBaseSchema } from "../users/base.js";

export const createSignUpSchema = z.object({
  body: userBaseSchema.pick({
    name: true,
    email: true,
    password: true,
  })
});

export type CreateSignUpSchema = z.infer<typeof createSignUpSchema>;