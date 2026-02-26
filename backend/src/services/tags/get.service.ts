import { Tag } from "@/models/tags.js";
import type { GetTagSchema } from "@/schema/tags/get.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { AppError } from "@/utils/appError.js";
import { response } from "@/utils/appResponse.js";

export default async function getTagService(userId: UserBaseSchema["id"], accountId: GetTagSchema["params"]["id"]) {
  const tag = await Tag.findOne({ _id: accountId, userId }, '-__v').exec();

  if (!tag) throw new AppError(404, "Tag not found");

  return response(200, tag, "Tag fetched successfully");
};
