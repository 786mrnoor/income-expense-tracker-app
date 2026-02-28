import { Transaction, type ITransaction } from "@/models/transactions.js";
import type { CreateTransactionSchema } from "@/schema/transactions/create.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { response } from "@/utils/appResponse.js";

export default async function createTransactionService(userId: UserBaseSchema["id"], data: CreateTransactionSchema["body"]) {
  const transaction = new Transaction({
    userId,
    ...data
  } satisfies ITransaction);

  await transaction.save();

  return response(201, transaction, "Transaction created successfully");
};
