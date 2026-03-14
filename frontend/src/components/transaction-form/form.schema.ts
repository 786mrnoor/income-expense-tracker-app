import { transactionBaseSchema } from "@/schemas/transactions/base.schema";
import type z from "zod";

export const transactionFormSchema = transactionBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})

export type TransactionFormInput = z.input<typeof transactionFormSchema>;
export type TransactionFormData = z.output<typeof transactionFormSchema>;

export function getDefaultValues(): TransactionFormInput {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  let today = local.toISOString().slice(0, 16);

  return {
    type: "income",
    status: "completed",
    method: "cash",
    tagId: '',
    accountId: '',
    amount: '',
    note: '',
    date: today,
  }
}
export const DEFAULT_VALUES: TransactionFormInput = getDefaultValues();