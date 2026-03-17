import z from "zod";
import { transactionBaseSchema } from "@/schemas/transactions/base.schema";
import { emptyStringToUndefined } from "@/schemas/common.schema";
import { toDateString } from "@/utils/date";

export const filterFormSchema = z.object({
  fromDate: emptyStringToUndefined(z.iso.date("Enter a valid date")),
  toDate: emptyStringToUndefined(z.iso.date("Enter a valid date")),
  transactionType: emptyStringToUndefined(transactionBaseSchema.shape.type.optional()),
  status: emptyStringToUndefined(transactionBaseSchema.shape.status.optional()),
  method: emptyStringToUndefined(transactionBaseSchema.shape.method.optional()),
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

export function getDefaultValues() {
  const today = toDateString(new Date());

  return {
    fromDate: today,
    toDate: today,
    transactionType: '',
    status: '',
    method: '',
    tagId: '',
    accountId: ''
  };
}
export const DEFAULT_VALUES = getDefaultValues();