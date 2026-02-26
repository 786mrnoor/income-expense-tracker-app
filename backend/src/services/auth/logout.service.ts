import { Session } from "@/models/sessions.js";
import type { AccessTokenData } from "@/types/auth.js";
import { AppError } from "@/utils/appError.js";

export default async function logoutService(user: AccessTokenData) {
  const result = await Session.deleteOne({
    _id: user.sid,
    userId: user.id,
  });

  if (result.deletedCount === 0) throw new AppError(404, "Session not found");
};
