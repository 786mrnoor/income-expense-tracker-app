import mongoose from "mongoose";
import { Account } from "@/models/accounts.js";
import { Tag } from "@/models/tags.js";
import { Transaction } from "@/models/transactions.js";
import type { UpdateTransactionSchema } from "@/schema/transactions/update.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { AppError } from "@/utils/appError.js";
import { response } from "@/utils/appResponse.js";

export default async function updateTransactionService(
  userId: UserBaseSchema["id"],
  transactionId: UpdateTransactionSchema["params"]["id"],
  data: UpdateTransactionSchema["body"],
) {
  const session = await mongoose.startSession();

  let updatedTransaction;
  try {
    await session.withTransaction(async () => {
      const oldTx = await Transaction.findOne({
        _id: transactionId,
        userId,
      }).session(session);

      if (!oldTx) throw new AppError(404, "Transaction not found")

      const oldSigned = oldTx.type === "income" ? oldTx.amount : -oldTx.amount;

      const newSigned = data.type === "income" ? data.amount : -data.amount;

      // ACCOUNT LOGIC
      if (oldTx.accountId.equals(data.accountId)) {
        // Same account → apply delta only
        const delta = newSigned - oldSigned;

        if (delta !== 0) {
          const accountResult = await Account.updateOne(
            { _id: data.accountId, userId },
            { $inc: { balance: delta } },
            { session }
          );
          if (accountResult.matchedCount === 0) throw new AppError(404, "Account not found");
        }
      } else {
        // Different account → reverse old, apply new
        const oldAccountResult = await Account.updateOne(
          { _id: oldTx.accountId, userId },
          { $inc: { balance: -oldSigned } },
          { session }
        );
        if (oldAccountResult.matchedCount === 0) throw new AppError(500, "Data integrity error: Account missing");

        const accountResult = await Account.updateOne(
          { _id: data.accountId, userId },
          { $inc: { balance: newSigned } },
          { session }
        );
        if (accountResult.matchedCount === 0) throw new AppError(400, "Account not found");
      }

      // TAG LOGIC (same pattern)
      if (oldTx.tagId.equals(data.tagId)) {
        const delta = newSigned - oldSigned;

        if (delta !== 0) {
          const tagResult = await Tag.updateOne(
            { _id: data.tagId, userId },
            { $inc: { balance: delta } },
            { session }
          );
          if (tagResult.matchedCount === 0) throw new AppError(404, "Tag not found");
        }
      } else {
        const oldTagResult = await Tag.updateOne(
          { _id: oldTx.tagId, userId },
          { $inc: { balance: -oldSigned } },
          { session }
        );
        if (oldTagResult.matchedCount === 0) throw new AppError(500, "Data integrity error: Tag missing");

        const tagResult = await Tag.updateOne(
          { _id: data.tagId, userId },
          { $inc: { balance: newSigned } },
          { session }
        );
        if (tagResult.matchedCount === 0) throw new AppError(404, "Tag not found");
      }

      updatedTransaction = await Transaction.findOneAndUpdate(
        { _id: transactionId, userId },
        { ...data },
        { runValidators: true, returnDocument: "after", session }
      );
    });
  } finally {
    await session.endSession();
  }

  return response(200, updatedTransaction, "Transaction udpated successfully");
};