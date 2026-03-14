import { createEntityAdapter } from "@reduxjs/toolkit";
import type { AccountBaseSchema } from "@/schemas/accounts/base.schema";

type AccountStatus = {
  status: "loading" | "success",
}

export const accountAdaptor = createEntityAdapter<AccountBaseSchema>({
  sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
});

export const accountInitialState = accountAdaptor.getInitialState<AccountStatus>({ status: "loading" });