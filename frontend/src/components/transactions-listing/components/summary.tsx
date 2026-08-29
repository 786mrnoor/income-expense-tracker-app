import { SummaryContainer } from "@/components/summary/summary";
import type { TransactionBaseSchema } from "@/schemas/transactions/base.schema";
import formatAmount from "@/utils/format-amount";

type SummaryProps = {
  transactions: TransactionBaseSchema[];
};
export default function Summary({ transactions }: SummaryProps) {

  const summary = transactions.reduce(
    (acc, item) => {
      const amount = item.amount;

      if (item.status === "completed") {
        acc[item.type] += amount;
      } else {
        if (item.type === "income") acc.pendingCredit += amount;
        else acc.pendingDebit += amount;
      }
      return acc;
    },
    { balance: 0, income: 0, expense: 0, pendingCredit: 0, pendingDebit: 0 },
  );

  summary.balance = summary.income - summary.expense;

  if (transactions.length === 0) return null;

  return (
    <SummaryContainer>
      <li>
        <p>Total Balance</p>
        <h2 className={summary.balance >= 0 ? "text-success" : "text-danger"}>
          {formatAmount(summary.balance)}
        </h2>
      </li>
      <li>
        <p>Total Transactions</p>
        <h2>{transactions.length}</h2>
      </li>
      <li className="text-success">
        <p>Total Income</p>
        <h2>₹{summary.income}</h2>
      </li>
      <li className="text-danger">
        <p>Total Expense</p>
        <h2>₹{summary.expense}</h2>
      </li>
      <li>
        <p>Pending Credit</p>
        <h2 className="text-success">₹{summary.pendingCredit}</h2>
      </li>
      <li>
        <p>Pending Debit</p>
        <h2 className="text-danger">₹{summary.pendingDebit}</h2>
      </li>
    </SummaryContainer>
  );
}
