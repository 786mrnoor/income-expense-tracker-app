import useTitle from '@/hooks/use-title';
import AddTransactionForm from './form';
import TransactionList from '../../../components/transaction-list/transaction.list';
import Summary from '@/components/transactions-summary/summary';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';
import { removeAllTransactions } from '@/redux/transaction/transaction.slice';

export default function AddTransactionPage() {
  useTitle('Add Transaction');
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(removeAllTransactions());
    }
  }, []);

  return (
    <div className="my-container p-3 p-lg-4 index-page">
      <h1 className='fs-2 text-center text-primary'>Add Transaction</h1>
      <AddTransactionForm />
      <hr />
      <Summary />
      <TransactionList />
    </div>
  );
}