import { lazy } from "react";

import { ErrorScreen } from "@/components/error-screen";
import { Route } from "react-router";
import AuthLayout from "./layout";
import Index from "./index/page";
import AddTransactionPage from "./add-transaction/page";
import EditTransactionPage from "./edit-transaction/page";

const TagPage = lazy(() => import("./tags/page"));
const AccountPage = lazy(() => import("./accounts/page"));

export const AuthRoutes = (
  <Route
    path="/"
    element={
      <ErrorScreen>
        <AuthLayout />
      </ErrorScreen>
    }
  >
    <Route index element={<Index />} />
    <Route path="add-transaction" element={<AddTransactionPage />} />
    <Route path="edit-transaction/:id" element={<EditTransactionPage />} />
    <Route path="tags" element={<TagPage />} />
    <Route path="accounts" element={<AccountPage />} />
  </Route>
);
