import z from "zod";
import { clearAccessToken, getAccessToken } from "./token";
import { customFetch } from "@/utils/custom-fetch";
import type { FetchConfig } from "@/utils/custom-fetch.types";

export async function authFetch<T extends z.ZodTypeAny>(config: FetchConfig<T>): Promise<z.infer<T>>;
export async function authFetch(config: FetchConfig): Promise<any>;

export async function authFetch<T extends z.ZodTypeAny | undefined>(config: FetchConfig<T>) {
  const token = await getAccessToken();
  try {
    const headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };

    const res = await customFetch({
      ...config,
      response: config.response,
      headers
    });

    return res;
  } catch (error: any) {
    if (error?.statusCode === 401) {
      clearAccessToken();
      return authFetch({
        ...config,
        response: config.response,
      });
    }
  }
}