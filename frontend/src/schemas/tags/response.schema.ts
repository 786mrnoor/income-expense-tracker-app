import z from "zod";
import { tagBaseSchema } from "./base.schema";

export const tagListResponseSchema = z.array(tagBaseSchema);

export const tagByIdResponseSchema = tagBaseSchema;

export const createTagResponseSchema = tagBaseSchema;

export const updateTagResponseSchema = tagBaseSchema;