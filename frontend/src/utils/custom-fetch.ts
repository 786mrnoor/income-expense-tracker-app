import z from "zod";
import { buildQuery } from "./build-query";
import type { FetchConfig } from "./custom-fetch.types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function customFetch<T extends z.ZodTypeAny>(
  config: FetchConfig<T>,
): Promise<z.infer<T>>;
export async function customFetch(config: FetchConfig): Promise<any>;

export async function customFetch<T extends z.ZodTypeAny | undefined>(
  config: FetchConfig<T>,
) {
  const url = BACKEND_URL + config.path + buildQuery(config.query);

  const res = await fetch(url, {
    ...config,
    body: config.body ? JSON.stringify(config.body) : undefined,
    headers: {
      ...config.headers,
      ...(config.body ? { "Content-Type": "application/json" } : {}),
    },
  });

  let json;
  if (!res.headers.get("content-type")?.includes("application/json")) {
    json = {};
  } else {
    json = await res.json();
  }

  if (!res.ok) {
    throw {
      ...json,
      success: false,
      statusCode: res.status,
      message: json.message || res.statusText,
    };
  }

  if (config.response) {
    return config.response.parse(json?.data);
  }

  return json;
}
