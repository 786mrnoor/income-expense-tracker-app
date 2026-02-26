import { Account } from "@/models/accounts.js";
import type { UpdateAccountSchema } from "@/schema/accounts/update.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { AppError } from "@/utils/appError.js";
import { response } from "@/utils/appResponse.js";

export default async function updateAccountService(
  userId: UserBaseSchema["id"],
  params: UpdateAccountSchema["params"],
  body: UpdateAccountSchema["body"],
) {
  try {
    const account = await Account.findOneAndUpdate(
      { _id: params.id, userId },
      { name: body.name },
      { runValidators: true, returnDocument: "after" }
    ).exec();

    if (!account) throw new AppError(404, "Account not found");

    return response(200, account, "Account updated successfully");

  } catch (error: any) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      throw new AppError(409, "Account already exists, use another name");
    }
    throw error;
  }
};
