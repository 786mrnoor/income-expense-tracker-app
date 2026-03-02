import mongoose from "mongoose";
import { Account } from "@/models/accounts.js";
import { Tag } from "@/models/tags.js";
import { Transaction } from "@/models/transactions.js";
import type { DeleteTransactionSchema } from "@/schema/transactions/delete.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { AppError } from "@/utils/appError.js";
import { response } from "@/utils/appResponse.js";

export default async function deleteTransactionService(userId: UserBaseSchema["id"], transactionId: DeleteTransactionSchema["params"]["id"]) {
  const mongoSession = await mongoose.startSession();

  try {
    await mongoSession.withTransaction(async (session) => {
      const transaction = await Transaction.findOne({
        _id: transactionId,
        userId
      }).session(session);

      if (!transaction) return;

      const reverseAmount = transaction.type === "income" ? -transaction.amount : transaction.amount;

      const accountResult = await Account.updateOne(
        { _id: transaction.accountId, userId },
        { $inc: { balance: reverseAmount } },
        { session }
      );
      if (accountResult.matchedCount === 0) throw new AppError(500, "Data integrity error: Account missing");

      const tagResult = await Tag.updateOne(
        { _id: transaction.tagId, userId },
        { $inc: { balance: reverseAmount } },
        { session }
      );
      if (tagResult.matchedCount === 0) throw new AppError(500, "Data integrity error: Tag missing");

      await Transaction.deleteOne(
        { _id: transactionId, userId },
        { session }
      );
    });
  } finally {
    await mongoSession.endSession();
  }

  return response(200, null, "Transaction deleted successfully");
};
