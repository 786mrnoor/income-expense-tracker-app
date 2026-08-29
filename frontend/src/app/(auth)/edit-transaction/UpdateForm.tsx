import type { TransactionFormData } from "@/components/transaction-form/form.schema";
import TransactionForm from "@/components/transaction-form/transaction.form";
import { transactionsQueries } from "@/queries/transactions";
import { type TransactionBaseSchema } from "@/schemas/transactions/base.schema";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

type UpdateFormProps = {
  id: TransactionBaseSchema["id"];
};

function UpdateForm({ id }: UpdateFormProps) {
  const { data } = useSuspenseQuery(transactionsQueries.getById(id));
  const updateMutation = useMutation(transactionsQueries.update);

  async function update(body: TransactionFormData) {
    try {
      await updateMutation.mutateAsync({ id, body });
      toast.success("Transaction updated successfully.");
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  return (
    <TransactionForm
      onSubmit={update}
      transaction={{
        ...data,
        date: new Date(data.date).toISOString().slice(0, 16),
      }}
    />
  );
}

export { UpdateForm };
