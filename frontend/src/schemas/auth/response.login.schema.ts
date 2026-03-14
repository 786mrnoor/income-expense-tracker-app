import z from "zod";

export const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type LoginResponseSchema = z.infer<typeof loginResponseSchema>;