import z from "zod";
import { tagBaseSchema } from "./base.js";

export const deleteTagSchema = z.object({
  params: tagBaseSchema.pick({
    id: true
  })
})

export type DeleteTagSchema = z.infer<typeof deleteTagSchema>;