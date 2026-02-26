import { createHash } from "node:crypto";

import { AppError } from "@/utils/appError.js";
import { response } from "@/utils/appResponse.js";
import { signToken, verifyToken } from "@/lib/jwt.js";
import type { RefreshToken, RefreshTokenData } from "@/types/auth.js";
import { Session } from "@/models/sessions.js";
import { User } from "@/models/users.js";

export default async function refreshTokenService(token: string) {
  if (!token) throw new AppError(401, "Missing token");

  let payload: RefreshTokenData;
  try {
    payload = verifyToken("refresh", token as RefreshToken);
  } catch {
    throw new AppError(403, "Invalid token")
  }

  const user = await User.findOne({ _id: payload.id, });
  if (!user) throw new AppError(403, "Invalid token");

  const hashed = createHash("sha256")
    .update(token)
    .digest("hex");

  // Rotate tokens
  const newAccessToken = signToken("access", {
    sid: payload.sid,
    id: payload.id,
    name: user.name,
    email: user.email,
  });
  const newRefreshToken = signToken("refresh", {
    sid: payload.sid,
    id: payload.id,
  });

  const newHashed = createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

  const updatedSession = await Session.updateOne(
    {
      _id: payload.sid,
      userId: payload.id,
      refreshTokenHash: hashed,
    },
    {
      refreshTokenHash: newHashed,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    }
  )

  if (updatedSession.modifiedCount === 0) throw new AppError(403, "Reuse detected");

  return [newRefreshToken, response(200, { accessToken: newAccessToken })] as const;
};
