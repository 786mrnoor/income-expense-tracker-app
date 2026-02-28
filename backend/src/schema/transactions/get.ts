import z from "zod";
import { transactionBaseSchema } from "./base.js";

export const getTransactionSchema = z.object({
  params: transactionBaseSchema.pick({
    id: true
  })
});

export type GetTransactionSchema = z.infer<typeof getTransactionSchema>;