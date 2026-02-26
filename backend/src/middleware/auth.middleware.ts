import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/lib/jwt.js";
import { AppError } from "@/utils/appError.js";
import type { AccessToken } from "@/types/auth.js";
import type { ValidatedRequest } from "@/types/validation.js";

export function authMiddleware(
  req: ValidatedRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    throw new AppError(401, "Unauthorized");
  }

  const token = header.replace("Bearer ", "") as AccessToken;
  if (!token) throw new AppError(401, "Token not found");

  try {
    const user = verifyToken("access", token);

    req.user = user;
    next();
  } catch (error) {
    throw new AppError(401, "Invalid token");
  }
}
