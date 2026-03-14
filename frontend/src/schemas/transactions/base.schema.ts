import z from "zod";
import { objectIdSchema, timestampSchema } from "../common.schema";
import { accountBaseSchema } from "../accounts/base.schema";
import { tagBaseSchema } from "../tags/base.schema";

export const transactionBaseSchema = z.object({
  id: objectIdSchema.brand('TransactionId'),
  accountId: accountBaseSchema.shape.id,
  tagId: tagBaseSchema.shape.id,

  amount: z.coerce.number("Please enter a valid amount").int("Amount must be an integer")
    .min(1, "Amount must be at least 1"),

  type: z.enum(["income", "expense"], "Please select a valid type"),
  method: z.enum(["cash", "upi", "card", "bank"], "Please select a valid method"),

  status: z.enum(["completed", "pending"], "Please select a valid status"),

  note: z
    .string("Please enter a note")
    .trim().min(3, "Note must be at least 3 characters long")
    .max(500, "Note must be at most 500 characters long").optional(),

  date: z.iso.datetime({ local: true, error: "Please enter a valid date" }),
}).extend(timestampSchema);

export type TransactionBaseSchema = z.infer<typeof transactionBaseSchema>;