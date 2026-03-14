import type z from "zod"

export type FetchConfig<T extends z.ZodTypeAny | undefined = undefined> = {
  path: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  response?: T;
  body?: object;
  query?: Record<string, string>;
  headers?: HeadersInit;
  signal?: AbortSignal;
  credentials?: RequestCredentials;
}

// export type Config<T, E> = {
//   method?: "GET" | "POST" | "PATCH" | "DELETE"
//   body?: object
//   response: z.ZodSchema<T>
//   error?: z.ZodSchema<E>
// }

// export type ApiError<E> = {
//   message: string;
//   statusCode: number;
//   errors?: E
// };

// export type ApiResponse<T, E> = Promise<[null, T] | [ApiError<E>, null]>;