import { Account } from "@/models/accounts.js";
import type { GetAccountSchema } from "@/schema/accounts/get.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { AppError } from "@/utils/appError.js";
import { response } from "@/utils/appResponse.js";

export default async function getAccountService(userId: UserBaseSchema["id"], accountId: GetAccountSchema["params"]["id"]) {
  const account = await Account.findOne({ _id: accountId, userId }, '-__v').exec();

  if (!account) throw new AppError(404, "Account not found");

  return response(200, account, "Account fetched successfully");
};
