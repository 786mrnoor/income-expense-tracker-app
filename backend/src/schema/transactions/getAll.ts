import z from "zod";
import { emptyStringToUndefined, parseLocalDate } from "@/lib/zod.js";
import { transactionBaseSchema } from "./base.js";

export const getAllTransactionSchema = z.object({
  query: z.object({
    fromDate: emptyStringToUndefined(z.iso.date("Enter a valid date").transform((val) => parseLocalDate(val))),
    toDate: emptyStringToUndefined(z.iso.date("Enter a valid date").transform((val) => parseLocalDate(val))),
    type: emptyStringToUndefined(transactionBaseSchema.shape.type.optional()),
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
  ),
});

export type GetAllTransactionSchema = z.infer<typeof getAllTransactionSchema>;