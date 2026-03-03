import mongoose from "mongoose";
import { Tag } from "@/models/tags.js";
import { Transaction } from "@/models/transactions.js";
import type { DeleteTagSchema } from "@/schema/tags/delete.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { AppError } from "@/utils/appError.js";
import { response } from "@/utils/appResponse.js";

export default async function deleteTagService(userId: UserBaseSchema["id"], tagId: DeleteTagSchema["params"]["id"]) {
  const session = await mongoose.startSession();
  try {

    await session.withTransaction(async () => {
      const transactionExists = await Transaction.exists({ tagId, userId }).session(session);

      if (transactionExists) throw new AppError(400, "Cannot delete tag because transactions are associated with it");

      const deleted = await Tag.deleteOne(
        { _id: tagId, userId },
        { session }
      );

      if (deleted.deletedCount === 0) throw new AppError(404, "Tag not found");
    });

  } finally {
    await session.endSession();
  }

  return response(204, null, "Tag deleted successfully");
};