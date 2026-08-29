import type { TransactionBaseSchema } from "@/schemas/transactions/base.schema";
import Summary from "./components/summary";
import { Pagination } from "../pagination/pagination";
import { MemoizedTransactionCard } from "./components/transaction-card/transaction.card";
import { useState } from "react";
import { arrayToEntities } from "@/utils/array-to-entities";
import toast from "react-hot-toast";
import { useSuspenseQueries } from "@tanstack/react-query";
import { accountsQueries } from "@/queries/accounts";
import { tagsQueries } from "@/queries/tags";

const LIMIT_PER_PAGE = 30;

type TransactionListProps = {
  transactions: TransactionBaseSchema[];
};

function TransactionsListing({
  transactions,
}: TransactionListProps) {
  const [accountsQuery, tagsQuery] = useSuspenseQueries({
    queries: [accountsQueries.all, tagsQueries.all],
  });

  const [page, setPage] = useState(1);

  const tagsEntities = arrayToEntities(tagsQuery.data);
  const accountEntities = arrayToEntities(accountsQuery.data);

  const currentPageTransactions = transactions.slice(
    (page - 1) * LIMIT_PER_PAGE,
    page * LIMIT_PER_PAGE,
  );

  //when the user is on the last page and the number of transactions is less than the limit, we set the page to the last page
  if (
    transactions.length !== 0 &&
    page > Math.ceil(transactions.length / LIMIT_PER_PAGE)
  ) {
    setPage(Math.ceil(transactions.length / LIMIT_PER_PAGE));
  }

  if (transactions.length === 0) return null;

  return (
    <>
      <Summary transactions={transactions} />
      <div className="list-group">
        {currentPageTransactions.map((transaction) => (
          <MemoizedTransactionCard
            key={transaction.id}
            data={transaction}
            tagName={tagsEntities[transaction.tagId]?.name}
            accountName={accountEntities[transaction.accountId]?.name}
            onDelete={() => {
              toast.success("Transaction Deleted Successfully!");
            }}
          />
        ))}
      </div>
      {transactions.length > 0 && (
        <Pagination
          activePage={page}
          limit={LIMIT_PER_PAGE}
          total={transactions.length}
          onPageChange={setPage}
          className="mt-2"
        />
      )}
    </>
  );
}

export { TransactionsListing };
