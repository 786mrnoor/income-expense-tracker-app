import { Router } from "express";
import { authMiddleware } from "@/middleware/auth.middleware.js";
import { validate } from "@/middleware/validate.middleware.js";

import { createTagController, deleteTagController, getAllTagController, getTagController, updateTagController } from "@/controllers/tags.js";

import { createTagSchema } from "@/schema/tags/create.js";
import { getTagSchema } from "@/schema/tags/get.js";
import { updateTagSchema } from "@/schema/tags/update.js";
import { deleteTagSchema } from "@/schema/tags/delete.js";

export const tagRouter = Router();

tagRouter
  .use(authMiddleware)
  .post('/', validate(createTagSchema), createTagController)
  .get('/', getAllTagController)
  .get('/:id', validate(getTagSchema), getTagController)
  .patch('/:id', validate(updateTagSchema), updateTagController)
  .delete('/:id', validate(deleteTagSchema), deleteTagController)