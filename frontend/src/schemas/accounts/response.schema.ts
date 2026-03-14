import z from "zod";
import { accountBaseSchema } from "./base.schema";

export const accountListResponseSchema = z.array(accountBaseSchema);

export const createAccountResponseSchema = accountBaseSchema;

export const updateAccountResponseSchema = accountBaseSchema;