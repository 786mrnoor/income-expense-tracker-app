import { Tag } from "@/models/tags.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { response } from "@/utils/appResponse.js";

export default async function getAllTagsService(userId: UserBaseSchema["id"]) {
  const tags = await Tag.find({ userId }, '-__v').exec();

  return response(200, tags, "Tags fetched successfully");
};
