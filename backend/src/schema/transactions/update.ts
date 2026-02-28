import z from "zod";
import { transactionBaseSchema } from "./base.js";

export const updateTransactionSchema = z.object({
  params: transactionBaseSchema.pick({
    id: true
  }),
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

export type UpdateTransactionSchema = z.infer<typeof updateTransactionSchema>;