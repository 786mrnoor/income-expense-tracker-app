import { api } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAccountList = createAsyncThunk(
  "account/fetchAccounts",
  api.accounts.getAll
)