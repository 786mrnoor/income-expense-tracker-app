import z from "zod";
import { transactionBaseSchema } from "./base.schema";

export const transasctionListResponseSchema = z.array(transactionBaseSchema);

export const transasctionGetResponseSchema = transactionBaseSchema;

export const createTransactionResponseSchema = transactionBaseSchema;

export const updateTransactionResponseSchema = transactionBaseSchema;