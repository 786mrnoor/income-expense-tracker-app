import { Account } from "@/models/accounts.js";
import type { DeleteAccountSchema } from "@/schema/accounts/delete.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { response } from "@/utils/appResponse.js";

export default async function deleteAccountService(userId: UserBaseSchema["id"], accountId: DeleteAccountSchema["params"]["id"]) {
  await Account.deleteOne({ _id: accountId, userId }).exec();

  return response(204, null, "Account deleted successfully");
};
