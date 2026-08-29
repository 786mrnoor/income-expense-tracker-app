import { useSuspenseQuery } from "@tanstack/react-query";
import type { FilterFormData } from "./filter-from.schema";
import { transactionsQueries } from "@/queries/transactions";
import { TransactionsListing } from "@/components/transactions-listing";

type TransactionListProps = {
  filter: FilterFormData;
};

function TransactionList({ filter }: TransactionListProps) {
  const { data: transactions } = useSuspenseQuery(
    transactionsQueries.list(filter),
  );

  return (
    <TransactionsListing
      transactions={transactions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )}
    />
  );
}

export { TransactionList };
