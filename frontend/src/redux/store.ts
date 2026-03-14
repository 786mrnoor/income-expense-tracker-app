import { configureStore } from "@reduxjs/toolkit";
import { tagReducer } from "./tag/tag.slice";
import { accountReducer } from "./account/account.slice";
import { transactionReducer } from "./transaction/transaction.slice";

const store = configureStore({
  reducer: {
    tags: tagReducer,
    accounts: accountReducer,
    transactions: transactionReducer
  }
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;