import type { Response } from "express";

export type ServiceResult<T> = {
  success: true;
  statusCode: number;
  message?: string;
  data: T;
}

export const response = <T>(statusCode = 200, data: T, message?: string): ServiceResult<T> => ({
  success: true,
  statusCode,
  message,
  data,
});

export function sendResponse<T>(res: Response, result: ServiceResult<T>) {

  return res.status(result.statusCode).json(result);
}