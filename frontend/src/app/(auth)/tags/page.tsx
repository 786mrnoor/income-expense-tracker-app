import { ErrorScreen } from "@/components/error-screen";
import Form from "./components/form.tag";
import { TagListing } from "./components/tag-listing/TagsListing";
import { EditProvider } from "./edit-context/EditProvider";
import { Suspense } from "react";
import { QueryLoader } from "@/components/query-loder/QueryLoader";

export default function TagPage() {
  return (
    <EditProvider>
      <div className="my-container">
        <Form />

        <ErrorScreen title="Error Loading Tags">
          <Suspense fallback={<QueryLoader>Loading Tags...</QueryLoader>}>
            <TagListing />
          </Suspense>
        </ErrorScreen>
      </div>
    </EditProvider>
  );
}
