import z from "zod";
import { accountBaseSchema } from "./base.js";

export const getAccountSchema = z.object({
  params: accountBaseSchema.pick({
    id: true
  })
})

export type GetAccountSchema = z.infer<typeof getAccountSchema>;