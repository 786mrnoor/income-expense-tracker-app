import { Tag, type ITag } from "@/models/tags.js";
import type { CreateTagSchema } from "@/schema/tags/create.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { AppError } from "@/utils/appError.js";
import { response } from "@/utils/appResponse.js";

export default async function createTagService(userId: UserBaseSchema["id"], data: CreateTagSchema["body"]) {
  try {
    const tag = new Tag({
      userId,
      name: data.name,
    } satisfies ITag);
    await tag.save();

    return response(201, tag, "Tag created successfully");
    
  } catch (error: any) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      throw new AppError(409, "Tag already exists, use another name");
    }
    throw error;
  }
}