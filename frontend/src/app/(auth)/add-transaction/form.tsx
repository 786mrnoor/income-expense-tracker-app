import { api } from "@/api";
import type { TransactionFormData } from "@/components/transaction-form/form.schema";
import TransactionForm from "@/components/transaction-form/transaction.form";
import { useAppDispatch } from "@/redux/hooks";
import { addTransaction } from "@/redux/transaction/transaction.slice";

export default function AddTransactionForm() {
  const dispatch = useAppDispatch();

  async function handleSubmit(body: TransactionFormData) {
    const data = await api.transactions.add(body);
    dispatch(addTransaction(data));

    return true;
  }

  return <TransactionForm onSubmit={handleSubmit} />;
}