import type { Request } from "express";
import type { PartialRecord } from "./utils.js";
import type z from "zod";

export type RequestPart = "params" | "body" | "query";

export type RequestShape<T = unknown> = PartialRecord<RequestPart, T>;

export type RequestZodShape = RequestShape<z.ZodObject>;

export type RequestZodSchema = z.ZodObject<RequestZodShape>;

export type ValidatedRequest<T extends RequestShape = {}> = Request<
  T extends { params: infer P } ? P : any,
  unknown,
  T extends { body: infer B } ? B : any
// T extends { query: infer Q } ? Q : any
> & {
  // Add your custom sanitized property
  sanitizedQuery?: T extends { query: infer Q } ? Q : any;
};