import { Transaction } from "@/models/transactions.js";
import type { GetAllTransactionSchema } from "@/schema/transactions/getAll.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { response } from "@/utils/appResponse.js";

export default async function getAllTransactionService(userId: UserBaseSchema["id"], query: GetAllTransactionSchema['query']) {

  query.fromDate.setHours(0, 0, 0, 0);
  query.toDate.setHours(23, 59, 59, 999);

  const filter = {
    ...(query.type && { type: query.type }),
    ...(query.status && { status: query.status }),
    ...(query.method && { method: query.method }),
    ...(query.tagId && { tagId: query.tagId }),
    ...(query.accountId && { accountId: query.accountId }),

    userId,
    date: {
      $gte: query.fromDate,
      $lte: query.toDate
    },
  };
  const transactions = await Transaction.find(filter).exec();

  return response(200, transactions, "Transactions fetched successfully");
};
