import { api } from "@/api";
import type { TransactionFormData } from "@/components/transaction-form/form.schema";
import TransactionForm from "@/components/transaction-form/transaction.form";
import { useAppDispatch } from "@/redux/hooks";
import { addTransaction } from "@/redux/transaction/transaction.slice";
import toast from "react-hot-toast";

export default function AddTransactionForm() {
  const dispatch = useAppDispatch();

  async function handleSubmit(body: TransactionFormData) {
    const data = await api.transactions.add(body);
    dispatch(addTransaction(data));
    toast.success('Transaction added successfully.');

    return true;
  }

  return <TransactionForm onSubmit={handleSubmit} />;
}