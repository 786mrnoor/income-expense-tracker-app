import z from "zod";
import { accountBaseSchema } from "./base.js";

export const deleteAccountSchema = z.object({
  params: accountBaseSchema.pick({
    id: true
  })
})

export type DeleteAccountSchema = z.infer<typeof deleteAccountSchema>;