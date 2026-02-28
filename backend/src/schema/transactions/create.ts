import z from "zod";
import { transactionBaseSchema } from "./base.js";

export const createTransactionSchema = z.object({
  body: transactionBaseSchema.pick({
    accountId: true,
    tagId: true,
    amount: true,
    type: true,
    method: true,
    status: true,
    note: true,
    date: true
  }).partial({
    note: true,
  })
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;