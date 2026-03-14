import { z } from "zod";

export const objectIdSchema = z
  .string()
  .trim()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export type ObjectIdString = z.infer<typeof objectIdSchema>;

export const timestampSchema = {
  createdAt: z.iso.datetime("Invalid createdAt date"),
  updatedAt: z.iso.datetime("Invalid updatedAt date"),
}

export const emptyStringToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((value) => {
    if (value === "") return undefined;
    return value;
  }, schema);