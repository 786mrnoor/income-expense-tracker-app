import type { Request, Response } from "express";
import type { ValidatedRequest } from "@/types/validation.js";
import { sendResponse } from "@/utils/appResponse.js";

import type { CreateTagSchema } from "@/schema/tags/create.js";
import type { GetTagSchema } from "@/schema/tags/get.js";
import type { UpdateTagSchema } from "@/schema/tags/update.js";
import type { DeleteTagSchema } from "@/schema/tags/delete.js";

import createTagService from "@/services/tags/create.service.js";
import getAllTagsService from "@/services/tags/getAll.service.js";
import getTagService from "@/services/tags/get.service.js";
import updateTagService from "@/services/tags/update.service.js";
import deleteTagService from "@/services/tags/delete.service.js";


export async function createTagController(req: ValidatedRequest<CreateTagSchema>, res: Response) {
  const result = await createTagService(req.user!.id, req.body);

  sendResponse(res, result);
}

export async function getAllTagController(req: Request, res: Response) {
  const result = await getAllTagsService(req.user!.id);

  sendResponse(res, result);
}

export async function getTagController(req: ValidatedRequest<GetTagSchema>, res: Response) {
  const result = await getTagService(req.user!.id, req.params.id);

  sendResponse(res, result);
}

export async function updateTagController(req: ValidatedRequest<UpdateTagSchema>, res: Response) {
  const result = await updateTagService(req.user!.id, req.params, req.body);

  sendResponse(res, result);
}

export async function deleteTagController(req: ValidatedRequest<DeleteTagSchema>, res: Response) {
  const result = await deleteTagService(req.user!.id, req.params.id);

  sendResponse(res, result);
}