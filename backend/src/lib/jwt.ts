import jwt from "jsonwebtoken";
import type { AccessToken, AccessTokenData, RefreshToken, RefreshTokenData, TokenType } from "@/types/auth.js";

// secrets
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export function signToken(type: "access", user: AccessTokenData): AccessToken;
export function signToken(type: "refresh", user: RefreshTokenData): RefreshToken;

export function signToken(type: TokenType, user: AccessTokenData | RefreshTokenData): AccessToken | RefreshToken {
  const secret = type === "access" ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

  const token = jwt.sign(user, secret,
    { expiresIn: type === "access" ? "15m" : "7d" }
  );

  return token as AccessToken | RefreshToken;
}

export function verifyToken(type: "access", token: AccessToken): AccessTokenData;
export function verifyToken(type: "refresh", token: RefreshToken): RefreshTokenData;
export function verifyToken<T extends TokenType>(
  type: T = "access" as T,
  token: T extends "access" ? AccessToken : RefreshToken
): AccessTokenData | RefreshTokenData {
  const secret = type === "access" ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

  return jwt.verify(token, secret) as AccessTokenData | RefreshTokenData;
}
