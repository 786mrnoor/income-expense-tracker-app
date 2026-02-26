import { Tag } from "@/models/tags.js";
import type { UpdateTagSchema } from "@/schema/tags/update.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { AppError } from "@/utils/appError.js";
import { response } from "@/utils/appResponse.js";

export default async function updateTagService(
  userId: UserBaseSchema["id"],
  params: UpdateTagSchema["params"],
  body: UpdateTagSchema["body"],
) {
  try {
    const tag = await Tag.findOneAndUpdate(
      { _id: params.id, userId },
      { name: body.name },
      { runValidators: true, returnDocument: "after" }
    ).exec();

    if (!tag) throw new AppError(404, "Tag not found");

    return response(200, tag, "Tag updated successfully");

  } catch (error: any) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      throw new AppError(409, "Tag already exists, use another name");
    }
    throw error;
  }
};
