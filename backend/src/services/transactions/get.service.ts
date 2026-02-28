import { Transaction } from "@/models/transactions.js";
import type { GetTransactionSchema } from "@/schema/transactions/get.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { AppError } from "@/utils/appError.js";
import { response } from "@/utils/appResponse.js";

export default async function getTransactionService(userId: UserBaseSchema["id"], transactionId: GetTransactionSchema["params"]["id"]) {
  const transaction = await Transaction.findOne({ _id: transactionId, userId }, '-__v').exec();

  if (!transaction) throw new AppError(404, "Transaction not found");

  return response(200, transaction, "Transaction fetched successfully");
};
