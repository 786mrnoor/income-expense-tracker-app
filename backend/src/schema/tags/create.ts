import z from "zod";
import { tagBaseSchema } from "./base.js";

export const createTagSchema = z.object({
  body: tagBaseSchema.pick({
    name: true,
  })
});

export type CreateTagSchema = z.infer<typeof createTagSchema>;