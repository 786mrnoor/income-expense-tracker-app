import mongoose from "mongoose";
import { Account } from "@/models/accounts.js";
import { Tag } from "@/models/tags.js";
import { Transaction, type ITransaction } from "@/models/transactions.js";
import type { CreateTransactionSchema } from "@/schema/transactions/create.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { AppError } from "@/utils/appError.js";
import { response } from "@/utils/appResponse.js";

export default async function createTransactionService(userId: UserBaseSchema["id"], data: CreateTransactionSchema["body"]) {
  const mongoSession = await mongoose.startSession();

  let transaction;
  try {
    await mongoSession.withTransaction(async (session) => {
      const incrementAmount = data.type === "income" ? data.amount : -data.amount;

      const accountResult = await Account.updateOne(
        { _id: data.accountId, userId },
        { $inc: { balance: incrementAmount } },
        { session }
      );
      if (accountResult.matchedCount === 0) throw new AppError(404, "Account not found");

      const tagResult = await Tag.updateOne(
        { _id: data.tagId, userId },
        { $inc: { balance: incrementAmount } },
        { session }
      );
      if (tagResult.matchedCount === 0) throw new AppError(404, "Tag not found");

      transaction = new Transaction({
        userId,
        ...data
      } satisfies ITransaction);

      await transaction.save({ session });
    });
  } finally {
    mongoSession.endSession();
  }
  return response(201, transaction, "Transaction created successfully");
};