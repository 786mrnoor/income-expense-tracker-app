import { Session } from "@/models/sessions.js";
import type { UserBaseSchema } from "@/schema/users/base.js";
import { AppError } from "@/utils/appError.js";

export default async function logoutAllService(userId: UserBaseSchema["id"]) {
  const result = await Session.deleteMany({ userId });

  if (result.deletedCount === 0) throw new AppError(404, "Session not found");
};
