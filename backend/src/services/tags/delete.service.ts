import { Tag } from "@/models/tags.js";
import type { DeleteTagSchema } from "@/schema/tags/delete.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { response } from "@/utils/appResponse.js";

export default async function deleteTagService(userId: UserBaseSchema["id"], accountId: DeleteTagSchema["params"]["id"]) {
  await Tag.deleteOne({ _id: accountId, userId }).exec();

  return response(204, null, "Tag deleted successfully");
};
