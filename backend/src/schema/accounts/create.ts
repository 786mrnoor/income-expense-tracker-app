import z from "zod";
import { accountBaseSchema } from "./base.js";

export const createAccountSchema = z.object({
  body: accountBaseSchema.pick({
    name: true,
  })
});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;