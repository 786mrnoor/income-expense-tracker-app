import { ErrorScreen } from "@/components/error-screen";
import Form from "./components/form.account";
import { EditProvider } from "./edit-context/EditProvider";
import { Suspense } from "react";
import { QueryLoader } from "@/components/query-loder/QueryLoader";
import { AccountListing } from "./components/account-listing/AccountListing";

export default function AccountPage() {

  return (
    <EditProvider>
      <div className="my-container">
        <Form />

        <ErrorScreen title="Error Loading Account">
          <Suspense fallback={<QueryLoader>Loading Accounts...</QueryLoader>}>
            <AccountListing />
          </Suspense>
        </ErrorScreen>
      </div>
    </EditProvider>
  );
}
