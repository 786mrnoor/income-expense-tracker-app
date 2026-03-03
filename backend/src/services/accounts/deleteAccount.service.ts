import mongoose from "mongoose";
import { Account } from "@/models/accounts.js";
import { Transaction } from "@/models/transactions.js";
import type { DeleteAccountSchema } from "@/schema/accounts/delete.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { response } from "@/utils/appResponse.js";
import { AppError } from "@/utils/appError.js";

export default async function deleteAccountService(userId: UserBaseSchema["id"], accountId: DeleteAccountSchema["params"]["id"]) {
  const mongooSession = await mongoose.startSession();

  try {
    await mongooSession.withTransaction(async (session) => {
      const transactionExists = await Transaction.exists({ accountId, userId }).session(session);

      if (transactionExists) throw new AppError(400, "Cannot delete account because transactions are associated with it");

      const deleted = await Account.deleteOne(
        { _id: accountId, userId },
        { session }
      ).exec();

      if (deleted.deletedCount === 0) throw new AppError(404, "Account not found");
    });
  } finally {
    await mongooSession.endSession();
  }

  return response(204, null, "Account deleted successfully");
};
