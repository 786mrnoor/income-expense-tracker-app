import { Router } from "express";
import { authMiddleware } from "@/middleware/auth.middleware.js";
import { validate } from "@/middleware/validate.middleware.js";

import { createTransactionController, deleteTransactionController, getAllTransactionController, getTransactionController, updateTransactionController } from "@/controllers/transactions.js";

import { createTransactionSchema } from "@/schema/transactions/create.js";
import { getTransactionSchema } from "@/schema/transactions/get.js";
import { updateTransactionSchema } from "@/schema/transactions/update.js";
import { deleteTransactionSchema } from "@/schema/transactions/delete.js";

export const transactionRouter = Router();

transactionRouter
  .use(authMiddleware)
  .post('/', validate(createTransactionSchema), createTransactionController)
  .get('/', getAllTransactionController)
  .get('/:id', validate(getTransactionSchema), getTransactionController)
  .patch('/:id', validate(updateTransactionSchema), updateTransactionController)
  .delete('/:id', validate(deleteTransactionSchema), deleteTransactionController)