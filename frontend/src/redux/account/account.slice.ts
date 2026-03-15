import { createSlice } from "@reduxjs/toolkit";
import { accountAdaptor, accountInitialState } from "./account.adaptor";
import { fetchAccountList } from "./account.thunk";

export const accountSlice = createSlice({
  name: 'accounts',
  initialState: accountInitialState,
  reducers: {
    addAccount: accountAdaptor.addOne,
    setAccount: accountAdaptor.setOne,
    removeAccount: accountAdaptor.removeOne
  },
  extraReducers: (builder) => {
    builder.addAsyncThunk(fetchAccountList, {
      pending(state) {
        state.status = "loading";
      },
      fulfilled(state, action) {
        state.status = "success";
        accountAdaptor.setAll(state, action.payload);
      },
    })
  },
});

export const { addAccount, setAccount, removeAccount } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;