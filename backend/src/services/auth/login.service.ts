import bcrypt from "bcryptjs";
import { createHash } from "node:crypto";
import type { CreateLoginSchema } from "@/schema/auth/login.js";
import { AppError } from "@/utils/appError.js";
import { response } from "@/utils/appResponse.js";
import { signToken } from "@/lib/jwt.js";

import { Session, type ISession } from "@/models/sessions.js";
import { User } from "@/models/users.js";

export default async function loginService(data: CreateLoginSchema["body"], userAgent?: string, ip?: string) {
  const user = await User.findOne({ email: data.email });
  if (!user) throw new AppError(401, "Invalid email or password");

  const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
  if (!isPasswordValid) throw new AppError(401, "Invalid email or password");

  // const newSessionArgs: ISession = 
  const session = new Session({
    userId: user._id,
    refreshTokenHash: "",
    userAgent,
    ip,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 Days
  } satisfies ISession);

  // Generate tokens
  const accessToken = signToken("access", {
    sid: session._id,
    id: user._id,
    name: user.name,
    email: user.email,
  });

  const refreshToken = signToken("refresh", {
    sid: session._id,
    id: user._id,
  });

  // Hash refresh token before saving
  const hashedToken = createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  session.refreshTokenHash = hashedToken;
  await session.save();

  return [refreshToken, response(200, { accessToken })] as const;
}
