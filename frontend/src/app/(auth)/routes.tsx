import { Route } from "react-router";
import AuthLayout from "./layout";
import { Providers } from "./providers";
import Index from "./index/page";
import AddTransactionPage from "./add-transaction/page";
import EditTransactionPage from "./edit-transaction/page";
import TagPage from "./tags/page";
import AccountPage from "./accounts/page";

export const AuthRoutes =
  <Route path="/"
    element={
      <Providers>
        <AuthLayout />
      </Providers>
    }>
    <Route index element={<Index />} />
    <Route path="add-transaction" element={<AddTransactionPage />} />
    <Route path="edit-transaction/:id" element={<EditTransactionPage />} />
    <Route path="tags" element={<TagPage />} />
    <Route path="accounts" element={<AccountPage />} />
  </Route>