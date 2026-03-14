import z from "zod";
import { customFetch } from "@/utils/custom-fetch";

export const refreshResponseSchema = z.object({
  accessToken: z.string(),
});

let refreshPromise: Promise<z.infer<typeof refreshResponseSchema>> | null = null;
let accessToken: string | null = null;

export async function getAccessToken() {
  try {

    if (accessToken) return accessToken;
    if (!refreshPromise) {
      refreshPromise = customFetch({
        path: '/api/auth/refresh',
        method: 'POST',
        response: refreshResponseSchema,
        credentials: "include"
      });
    }

    const data = await refreshPromise;


    accessToken = data.accessToken;
    refreshPromise = null;
    return accessToken;

  } catch (error: any) {
    if (error && error?.statusCode === 401 || error?.statusCode === 403) {
      window.location.href = "/login";
    }
    throw error;
  }
}

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function clearAccessToken() {
  accessToken = null;
}