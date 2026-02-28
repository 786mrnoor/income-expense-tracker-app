import z from "zod";
import { transactionBaseSchema } from "./base.js";

export const deleteTransactionSchema = z.object({
  params: transactionBaseSchema.pick({
    id: true
  })
});

export type DeleteTransactionSchema = z.infer<typeof deleteTransactionSchema>;