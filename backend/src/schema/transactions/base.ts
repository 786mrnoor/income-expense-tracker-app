import z from "zod";
import { objectIdSchema } from "@/lib/zod.js";
import { userBaseSchema } from "../users/base.js";
import { accountBaseSchema } from "../accounts/base.js";
import { tagBaseSchema } from "../tags/base.js";

export const transactionBaseSchema = z.object({
  id: objectIdSchema.brand('TransactionId'),
  userId: userBaseSchema.shape.id,
  accountId: accountBaseSchema.shape.id,
  tagId: tagBaseSchema.shape.id,

  amount: z
    .int("Please enter a valid amount")
    .min(1, "Amount must be at least 1"),

  type: z.enum(["income", "expense"], "Please select a valid type"),
  method: z.enum(["cash", "upi", "card", "bank"], "Please select a valid method"),

  status: z.enum(["completed", "pending"], "Please select a valid status"),

  note: z
    .string("Please enter a description")
    .trim().min(3, "Description must be at least 3 characters long")
    .max(500, "Description must be at most 500 characters long"),

  date: z.coerce.date("Please enter a valid date").default(new Date()),
});

export type TransactionBaseSchema = z.infer<typeof transactionBaseSchema>;