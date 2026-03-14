import type { Response } from "express";
import type { ValidatedRequest } from "@/types/validation.js";
import { sendResponse } from "@/utils/appResponse.js";

import type { CreateTransactionSchema } from "@/schema/transactions/create.js";
import type { GetAllTransactionSchema } from "@/schema/transactions/getAll.js";
import type { DeleteTransactionSchema } from "@/schema/transactions/delete.js";
import type { GetTransactionSchema } from "@/schema/transactions/get.js";
import type { UpdateTransactionSchema } from "@/schema/transactions/update.js";

import createTransactionService from "@/services/transactions/create.service.js";
import deleteTransactionService from "@/services/transactions/delete.service.js";
import getTransactionService from "@/services/transactions/get.service.js";
import getAllTransactionService from "@/services/transactions/getAll.service.js";
import updateTransactionService from "@/services/transactions/update.service.js";

export async function createTransactionController(req: ValidatedRequest<CreateTransactionSchema>, res: Response) {
  const result = await createTransactionService(req.user!.id, req.body);

  sendResponse(res, result);
}

export async function getAllTransactionController(req: ValidatedRequest<GetAllTransactionSchema>, res: Response) {
  const result = await getAllTransactionService(req.user!.id, req.sanitizedQuery!);

  sendResponse(res, result);
}

export async function getTransactionController(req: ValidatedRequest<GetTransactionSchema>, res: Response) {
  const result = await getTransactionService(req.user!.id, req.params.id);

  sendResponse(res, result);
}

export async function updateTransactionController(req: ValidatedRequest<UpdateTransactionSchema>, res: Response) {
  const result = await updateTransactionService(req.user!.id, req.params.id, req.body);

  sendResponse(res, result);
}

export async function deleteTransactionController(req: ValidatedRequest<DeleteTransactionSchema>, res: Response) {
  const result = await deleteTransactionService(req.user!.id, req.params.id);

  sendResponse(res, result);
}