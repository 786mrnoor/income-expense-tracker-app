import { authFetch } from "@/lib/auth-fetch";
import { authSchema } from "@/schemas/auth/auth.schema";

export const users = {
  me: () =>
    authFetch({
      path: "/api/auth/me",
      method: "GET",
      response: authSchema,
    }),

  signout: () =>
    authFetch({
      path: "/api/auth/logout",
      method: "POST",
    }),
};
