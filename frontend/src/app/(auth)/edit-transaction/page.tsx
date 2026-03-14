import useTitle from '@/hooks/use-title';
import TransactionForm from '@/components/transaction-form/transaction.form';
import type { TransactionFormData } from '@/components/transaction-form/form.schema';
import { useEffect, useState } from 'react';
import { api } from '@/api';
import { useParams } from 'react-router';
import { transactionBaseSchema, type TransactionBaseSchema } from '@/schemas/transactions/base.schema';
import toast from 'react-hot-toast';

export default function EditTransactionPage() {
  useTitle('Add Transaction');
  const [transaction, setTransaction] = useState<TransactionBaseSchema | null>(null);

  const { id } = useParams();

  useEffect(() => {
    let transactionId: TransactionBaseSchema["id"];
    const result = transactionBaseSchema.shape.id.safeParse(id);
    if (result.success) {
      transactionId = result.data;
    } else {
      window.location.href = '/';
      return;
    }

    let ignore = false;
    async function query() {
      try {
        let data = await api.transactions.get(transactionId);
        if (ignore) return;

        const date = new Date(data.date);
        const offset = date.getTimezoneOffset();
        const local = new Date(date.getTime() - offset * 60 * 1000);
        data.date = local.toISOString().slice(0, 16);

        setTransaction(data);
      } catch (error) {
        console.error(error);
      }
    }
    query();

    return () => {
      ignore = true;
    };
  }, [id]);

  async function updateTransaction(body: TransactionFormData) {
    if (!transaction) return false;

    try {
      await api.transactions.update(transaction?.id, body);
      toast.success('Transaction updated successfully.');
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  return (
    <div className="my-container p-3 p-lg-4 index-page">
      {
        transaction &&
        <TransactionForm transaction={transaction} onSubmit={updateTransaction} />
      }
    </div>
  );
}