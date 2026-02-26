import { Router } from "express";
import { authMiddleware } from "@/middleware/auth.middleware.js";
import { validate } from "@/middleware/validate.middleware.js";

import { createAccountController, getAllAccountController, getAccountController, updateAccountController, deleteAccountController } from "@/controllers/accounts.js";

import { createAccountSchema } from "@/schema/accounts/create.js";
import { getAccountSchema } from "@/schema/accounts/get.js";
import { updateAccountSchema } from "@/schema/accounts/update.js";
import { deleteAccountSchema } from "@/schema/accounts/delete.js";

export const accountRouter = Router();

accountRouter
  .use(authMiddleware)
  .post('/', validate(createAccountSchema), createAccountController)
  .get('/', getAllAccountController)
  .get('/:id', validate(getAccountSchema), getAccountController)
  .patch('/:id', validate(updateAccountSchema), updateAccountController)
  .delete('/:id', validate(deleteAccountSchema), deleteAccountController)