import z from "zod";
import { accountBaseSchema } from "./base.js";

export const updateAccountSchema = z.object({
  params: accountBaseSchema.pick({
    id: true
  }),

  body: accountBaseSchema.pick({
    name: true,
  })
});

export type UpdateAccountSchema = z.infer<typeof updateAccountSchema>;