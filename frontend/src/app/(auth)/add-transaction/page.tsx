import useTitle from "@/hooks/use-title";
import { AddTransactionForm } from "./components/form/form";
import { Suspense, useState } from "react";
import { ErrorScreen } from "@/components/error-screen";
import type { TransactionBaseSchema } from "@/schemas/transactions/base.schema";
import { TransactionsListing } from "@/components/transactions-listing";

export default function AddTransactionPage() {
  useTitle("Add Transaction");
  const [transactions, setTransactions] = useState<TransactionBaseSchema[]>([]);
  
  return (
    <div className="my-container p-3 p-lg-4 index-page">
      <h1 className="fs-2 text-center text-primary">Add Transaction</h1>
      <AddTransactionForm
        onAdded={(data) => setTransactions([...transactions, data])}
      />
      <hr />

      <ErrorScreen>
        <Suspense>
          <TransactionsListing
            onDeleted={(id) =>
              setTransactions(transactions.filter((t) => t.id !== id))
            }
            transactions={transactions.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )}
          />
        </Suspense>
      </ErrorScreen>
    </div>
  );
}
