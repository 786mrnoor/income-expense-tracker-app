import type { TransactionBaseSchema } from "./base.schema";

export type CreateTransactionRequest = Omit<TransactionBaseSchema, 'id' | 'createdAt' | 'updatedAt'>

export type GetTransactionRequestQuery = {
  fromDate: string;
  toDate: string;
  type?: TransactionBaseSchema["type"];
  status?: TransactionBaseSchema["status"];
  tagId?: TransactionBaseSchema["tagId"];
  accountId?: TransactionBaseSchema["accountId"];
}