import { api } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTagList = createAsyncThunk(
  "tag/fetchTags",
  api.tags.getAll
)