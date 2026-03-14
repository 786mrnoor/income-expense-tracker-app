import mongoose from "mongoose";
import z from "zod";

export const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  })
  .transform((val) => new mongoose.Types.ObjectId(val));

export const emptyStringToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((value) => {
    if (value === "") return undefined;
    return value;
  }, schema);

export function parseLocalDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}