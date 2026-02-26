import type { Request, Response } from "express";
import type { ValidatedRequest } from "@/types/validation.js";
import { sendResponse } from "@/utils/appResponse.js";

import type { CreateAccountSchema } from "@/schema/accounts/create.js";
import type { GetAccountSchema } from "@/schema/accounts/get.js";

import createAccountService from "@/services/accounts/create.service.js";
import getAllAccountService from "@/services/accounts/getAllAccount.service.js";
import getAccountService from "@/services/accounts/getAccount.service.js";
import type { UpdateAccountSchema } from "@/schema/accounts/update.js";
import updateAccountService from "@/services/accounts/updateAccount.service.js";
import type { DeleteAccountSchema } from "@/schema/accounts/delete.js";
import deleteAccountService from "@/services/accounts/deleteAccount.service.js";

export async function createAccountController(req: ValidatedRequest<CreateAccountSchema>, res: Response) {
  const result = await createAccountService(req.user!.id, req.body);

  sendResponse(res, result);
}

export async function getAllAccountController(req: Request, res: Response) {
  const result = await getAllAccountService(req.user!.id);

  sendResponse(res, result);
}

export async function getAccountController(req: ValidatedRequest<GetAccountSchema>, res: Response) {
  const result = await getAccountService(req.user!.id, req.params.id);

  sendResponse(res, result);
}

export async function updateAccountController(req: ValidatedRequest<UpdateAccountSchema>, res: Response) {
  const result = await updateAccountService(req.user!.id, req.params, req.body);

  sendResponse(res, result);
}

export async function deleteAccountController(req: ValidatedRequest<DeleteAccountSchema>, res: Response) {
  const result = await deleteAccountService(req.user!.id, req.params.id);

  sendResponse(res, result);
}