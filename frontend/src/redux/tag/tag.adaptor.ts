import type { TagBaseSchema } from "@/schemas/tags/base.schema";
import { createEntityAdapter } from "@reduxjs/toolkit";

type TagStatus = {
  status: "loading" | "success",
}

export const tagAdaptor = createEntityAdapter<TagBaseSchema>({
  sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
});

export const tagsInitialState = tagAdaptor.getInitialState<TagStatus>({ status: "loading" });