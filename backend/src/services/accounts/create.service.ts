import { Account, type IAccount } from "@/models/accounts.js";
import type { CreateAccountSchema } from "@/schema/accounts/create.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { AppError } from "@/utils/appError.js";
import { response } from "@/utils/appResponse.js";

export default async function createAccountService(userId: UserBaseSchema["id"], data: CreateAccountSchema["body"]) {
  try {
    const account = new Account({
      userId,
      name: data.name,
    } satisfies IAccount);
    await account.save();

    return response(201, account, "Account created successfully");
    
  } catch (error: any) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      throw new AppError(409, "Account already exists, use another name");
    }
    throw error;
  }
}