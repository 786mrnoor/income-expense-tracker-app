import z from "zod";
import { tagBaseSchema } from "./base.js";

export const updateTagSchema = z.object({
  params: tagBaseSchema.pick({
    id: true
  }),

  body: tagBaseSchema.pick({
    name: true,
  })
});

export type UpdateTagSchema = z.infer<typeof updateTagSchema>;