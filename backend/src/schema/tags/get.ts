import z from "zod";
import { tagBaseSchema } from "./base.js";

export const getTagSchema = z.object({
  params: tagBaseSchema.pick({
    id: true
  })
})

export type GetTagSchema = z.infer<typeof getTagSchema>;