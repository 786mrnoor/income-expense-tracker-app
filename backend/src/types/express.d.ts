import { type AccessTokenData } from "./auth.js";
import type { AccessToken, RefreshToken } from "./utils.ts";

declare global {
  namespace Express {
    interface Request {

      cookies: Record<string, any> & {
        refreshToken?: RefreshToken;
      };
      user?: AccessTokenData;
    }
  }
}

declare module "http" {
  interface IncomingHttpHeaders {
    authorization?: `Bearer ${AccessToken}`;
  }
}