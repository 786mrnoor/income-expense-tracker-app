import useTitle from "@/hooks/use-title";
import FilterForm from "./components/filter-form";
import { Suspense, useState } from "react";
import { ErrorScreen } from "@/components/error-screen";
import { QueryLoader } from "@/components/query-loder/QueryLoader";
import type { FilterFormData } from "./components/filter-from.schema";
import { TransactionList } from "./components/TransactionList";

export default function Index() {
  useTitle();
  const [filter, setFilter] = useState<FilterFormData | null>(null);

  return (
    <ErrorScreen>
      <Suspense fallback={<QueryLoader />}>
        <div className="my-container p-3 p-lg-4 index-page">
          <FilterForm onFilter={(data) => setFilter(data)} />
          <hr />

          <ErrorScreen>
            <Suspense fallback={<QueryLoader />}>
              {filter && <TransactionList filter={filter} />}
            </Suspense>
          </ErrorScreen>
        </div>
      </Suspense>
    </ErrorScreen>
  );
}
