import type { RefreshToken } from "@/types/auth.js";
import type { CookieOptions, Response } from "express";

const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/api/auth/refresh",
}

export function setSession(res: Response, refreshToken: RefreshToken) {
  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
}

export function clearSession(res: Response) {
  res.clearCookie("refreshToken");
}