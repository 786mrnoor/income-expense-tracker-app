import { Transaction } from "@/models/transactions.js";
import type { DeleteTransactionSchema } from "@/schema/transactions/delete.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { response } from "@/utils/appResponse.js";

export default async function deleteTransactionService(userId: UserBaseSchema["id"], transactionId: DeleteTransactionSchema["params"]["id"]) {
  await Transaction.deleteOne({ _id: transactionId, userId }).exec();

  return response(200, null, "Transaction deleted successfully");
};
