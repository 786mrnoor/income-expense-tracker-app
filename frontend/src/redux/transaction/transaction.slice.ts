import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { transactionAdaptor, transactionInitialState } from "./transaction.adaptor";
import type { TransactionBaseSchema } from "@/schemas/transactions/base.schema";

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState: transactionInitialState,
  reducers: {
    setTransactions(state, payload: PayloadAction<TransactionBaseSchema[]>) {
      state.status = "success";
      transactionAdaptor.setAll(state, payload);
    },
    addTransaction: transactionAdaptor.addOne,
    updateTransaction: transactionAdaptor.updateOne,
    removeTransaction: transactionAdaptor.removeOne,
    removeAllTransactions: transactionAdaptor.removeAll
  }
});

export const { setTransactions, addTransaction, updateTransaction, removeTransaction, removeAllTransactions } = transactionSlice.actions;
export const transactionReducer = transactionSlice.reducer;