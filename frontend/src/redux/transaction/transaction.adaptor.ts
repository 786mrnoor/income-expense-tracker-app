import { createEntityAdapter } from "@reduxjs/toolkit";
import type { TransactionBaseSchema } from "@/schemas/transactions/base.schema";

type TransactionStatus = {
  status: "loading" | "success",
}

export const transactionAdaptor = createEntityAdapter<TransactionBaseSchema>({
  sortComparer: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
});

export const transactionInitialState = transactionAdaptor.getInitialState<TransactionStatus>({ status: "loading" });