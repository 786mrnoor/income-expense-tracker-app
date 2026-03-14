import { createEntityAdapter } from "@reduxjs/toolkit";
import type { TransactionBaseSchema } from "@/schemas/transactions/base.schema";

type TransactionStatus = {
  status: "loading" | "success",
}

export const transactionAdaptor = createEntityAdapter<TransactionBaseSchema>({
  sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
});

export const transactionInitialState = transactionAdaptor.getInitialState<TransactionStatus>({ status: "loading" });