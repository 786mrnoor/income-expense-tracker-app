import { ErrorScreen } from "@/components/error-screen";
import { QueryLoader } from "@/components/query-loder/QueryLoader";
import type { TransactionFormData } from "@/components/transaction-form/form.schema";
import TransactionForm from "@/components/transaction-form/transaction.form";
import { transactionsQueries } from "@/queries/transactions";
import type { TransactionBaseSchema } from "@/schemas/transactions/base.schema";
import { useMutation } from "@tanstack/react-query";
import { Suspense } from "react";
import toast from "react-hot-toast";

type AddTransactionFormProps = {
  onAdded: (transaction: TransactionBaseSchema) => void;
};
function AddTransactionForm({ onAdded }: AddTransactionFormProps) {
  const addMutation = useMutation(transactionsQueries.add);
  async function handleSubmit(body: TransactionFormData) {
    const data = await addMutation.mutateAsync(body);
    onAdded(data);
    toast.success("Transaction added successfully.");

    return true;
  }

  return (
    <ErrorScreen>
      <Suspense fallback={<QueryLoader />}>
        <TransactionForm onSubmit={handleSubmit} />
      </Suspense>
    </ErrorScreen>
  );
}

export { AddTransactionForm };
