import z from "zod";
import { userBaseSchema } from "../users/base.js";

export const createLoginSchema = z.object({
  body: userBaseSchema.pick({
    email: true,
    password: true,
  })
});

export type CreateLoginSchema = z.infer<typeof createLoginSchema>;