import { lazy } from "react";
import { Route } from "react-router";

const AuthLayout = lazy(() => import("./layout"));
const Providers = lazy(() => import("./providers"))
const Index = lazy(() => import("./index/page"));
const AddTransactionPage = lazy(() => import("./add-transaction/page"));
const EditTransactionPage = lazy(() => import("./edit-transaction/page"));
const TagPage = lazy(() => import("./tags/page"));
const AccountPage = lazy(() => import("./accounts/page"));

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