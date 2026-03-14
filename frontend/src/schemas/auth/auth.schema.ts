import type z from "zod";
import { userBaseSchema } from "../users/base";

export const authSchema = userBaseSchema.pick({
  id: true,
  name: true,
  email: true
});

export type AuthSchema = z.infer<typeof authSchema>;