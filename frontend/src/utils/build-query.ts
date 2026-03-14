import type { FetchConfig } from "./custom-fetch.types";

export function buildQuery(query: FetchConfig['query']) {
  if (!query) return "";

  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value))
    }
  })

  const str = params.toString();

  return `?${str}`;
}