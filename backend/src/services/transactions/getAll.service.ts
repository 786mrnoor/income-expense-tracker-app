import { Transaction } from "@/models/transactions.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { response } from "@/utils/appResponse.js";

export default async function getAllTransactionService(userId: UserBaseSchema["id"]) {
  const transactions = await Transaction.find({ userId }).exec();

  return response(200, transactions, "Transactions fetched successfully");
};
