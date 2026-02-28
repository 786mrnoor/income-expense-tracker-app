import { Transaction } from "@/models/transactions.js";
import type { UpdateTransactionSchema } from "@/schema/transactions/update.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { AppError } from "@/utils/appError.js";
import { response } from "@/utils/appResponse.js";

export default async function updateTransactionService(
  userId: UserBaseSchema["id"],
  params: UpdateTransactionSchema["params"],
  data: UpdateTransactionSchema["body"],
) {
  const transaction = await Transaction.findOneAndUpdate(
    { _id: params.id, userId },
    { ...data },
    {runValidators: true, returnDocument: "after"}
  ).exec();

  if (!transaction) throw new AppError(404, "Transaction not found");

  return response(200, transaction, "Transaction udpated successfully");
};
