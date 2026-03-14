import z from "zod";
import { transactionBaseSchema } from "@/schemas/transactions/base.schema";
import { emptyStringToUndefined } from "@/schemas/common.schema";

export const filterFormSchema = z.object({
  fromDate: emptyStringToUndefined(z.iso.date("Enter a valid date")),
  toDate: emptyStringToUndefined(z.iso.date("Enter a valid date")),
  transactionType: emptyStringToUndefined(transactionBaseSchema.shape.type.optional()),
  status: emptyStringToUndefined(transactionBaseSchema.shape.status.optional()),
  tagId: emptyStringToUndefined(transactionBaseSchema.shape.tagId.optional()),
  accountId: emptyStringToUndefined(transactionBaseSchema.shape.accountId.optional()),
}).refine(
  (data) => data.fromDate && data.toDate && new Date(data.fromDate) <= new Date(data.toDate),
  {
    message: "From date must be before To date",
    path: ["toDate"],
  }
);

export type FilterFormIinput = z.input<typeof filterFormSchema>;
export type FilterFormData = z.output<typeof filterFormSchema>;

const yesterday = () => {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}
const today = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

export function getDefaultValues() {
  return {
    fromDate: yesterday(),
    toDate: today(),
  };
}
export const DEFAULT_VALUES = getDefaultValues();