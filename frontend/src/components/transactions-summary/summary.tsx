import { SummaryContainer } from "@/components/summary/summary";
import { useAppSelector } from "@/redux/hooks";
import { selectTransactions } from "@/redux/transaction/transaction.selectors";

export default function Summary() {
  const transactions = useAppSelector(selectTransactions);

  const summary = transactions.reduce(
    (acc, item) => {
      const amount = item.amount;

      if (item.status === 'completed') {
        acc[item.type] += amount;
      } else {
        if (item.type === 'income')
          acc.pendingCredit += amount;
        else
          acc.pendingDebit += amount;
      }


      return acc;
    },
    { income: 0, expense: 0, pendingCredit: 0, pendingDebit: 0 }
  );

  if (transactions.length === 0) return null;

  return (
    <SummaryContainer>
      <li className='text-success'>
        <p>Total Income</p>
        <h2>₹{summary.income}</h2>
      </li>
      <li className='text-danger'>
        <p>Total Expense</p>
        <h2>₹{summary.expense}</h2>
      </li>
      <li>
        <p>Total Balance</p>
        <h2 className='text-success'>₹{summary.income - summary.expense}</h2>
      </li>
      <li>
        <p>Total Transactions</p>
        <h2>{transactions.length}</h2>
      </li>
      <li>
        <p>Pending Credit</p>
        <h2 className='text-success'>₹{summary.pendingCredit}</h2>
      </li>
      <li>
        <p>Pending Debit</p>
        <h2 className='text-danger'>₹{summary.pendingDebit}</h2>
      </li>
    </SummaryContainer>
  )
};
