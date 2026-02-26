import { Account } from "@/models/accounts.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { response } from "@/utils/appResponse.js";

export default async function getAllAccountService(userId: UserBaseSchema["id"]) {
  const accounts = await Account.find({ userId }, '-__v').exec();

  return response(200, accounts, "Accounts fetched successfully");
};
