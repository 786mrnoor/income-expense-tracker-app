import type { RootState } from "../store";
import { accountAdaptor } from "./account.adaptor";

export const { selectAll: selectAccounts, selectEntities: selectAccountsEntities } = accountAdaptor.getSelectors<RootState>((state) => state.accounts);

export const selectAccountsLoading = (state: RootState) => state.accounts.status === "loading";