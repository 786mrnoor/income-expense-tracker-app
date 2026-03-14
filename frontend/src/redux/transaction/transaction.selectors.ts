import type { RootState } from "../store";
import { transactionAdaptor } from "./transaction.adaptor";

export const { selectAll: selectTransactions } = transactionAdaptor.getSelectors<RootState>((state) => state.transactions);

export const selectTransactionsLoading = (state: RootState) => state.transactions.status === "loading";