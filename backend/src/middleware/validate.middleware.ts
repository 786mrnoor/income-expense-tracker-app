import type { PartialRecord } from "@/types/utils.js";
import type { RequestPart, RequestZodSchema, RequestZodShape, ValidatedRequest } from "@/types/validation.js";
import { AppError } from "@/utils/appError.js";
import type { NextFunction, Response } from "express";
import z from "zod";

const SchemaKeys: RequestPart[] = ["body", "query", "params"] as const;

export function validate<T extends RequestZodSchema>(schemas: T) {
  return (req: ValidatedRequest, _res: Response, next: NextFunction) => {
    let hasError = false;
    const errors: PartialRecord<keyof RequestZodShape, any> = {};
    const parsed: PartialRecord<keyof RequestZodShape, any> = {};

    SchemaKeys.forEach(key => {
      const schema = schemas.shape[key];
      if (!schema) return;

      const result = schema.safeParse(req[key] || {});

      if (!result.success) {
        hasError = true;
        errors[key] = z.flattenError(result.error).fieldErrors;
      } else {
        parsed[key] = result.data;
      }
    })
    if (hasError) {
      throw new AppError(400, "Validation Error", errors);
    }

    req.sanitizedQuery = parsed.query;
    req.params = parsed.params;
    req.body = parsed.body;

    next();
  }
}