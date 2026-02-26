import type { UserBaseSchema } from "@/schema/users/base.js";
import type { Brand } from "./utils.js";
import type { SessionId } from "@/models/sessions.js";


export type AccessToken = Brand<string, "AccessToken">;
export type RefreshToken = Brand<string, "RefreshToken">;

export type TokenType = "access" | "refresh";

export type AccessTokenData = {
  sid: SessionId;
  id: UserBaseSchema["id"];
  name: UserBaseSchema["name"];
  email: UserBaseSchema["email"];
}

export type RefreshTokenData = {
  sid: SessionId;
  id: UserBaseSchema["id"];
}
