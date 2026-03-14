import { useEffect, useState } from "react";
import { Pagination } from "@/components/pagination/pagination";
import { MemoizedTransactionCard } from "@/components/transaction-card/transaction.card";
import { selectAccountsEntities } from "@/redux/account/account.selectors";
import { useAppSelector } from "@/redux/hooks";
import { selectTagsEntities } from "@/redux/tag/tag.selectors";
import { selectTransactions } from "@/redux/transaction/transaction.selectors";

const LIMIT_PER_PAGE = 30;

export default function TransactionList() {
  const transactions = useAppSelector(selectTransactions);
  const tagsEntities = useAppSelector(selectTagsEntities);
  const accountEntities = useAppSelector(selectAccountsEntities);

  const [page, setPage] = useState(1);

  const currentPageTransactions = transactions.slice((page - 1) * LIMIT_PER_PAGE, page * LIMIT_PER_PAGE);

  //when the user is on the last page and the number of transactions is less than the limit, we set the page to the last page
  if (transactions.length !== 0 && page > Math.ceil(transactions.length / LIMIT_PER_PAGE)) {
    setPage(Math.ceil(transactions.length / LIMIT_PER_PAGE));
  }

  useEffect(() => {
    if (transactions.length === 0) setPage(1);
  }, [transactions.length]);

  return (
    <>
      <div className="list-group">
        {
          currentPageTransactions.map(transaction => (
            <MemoizedTransactionCard
              key={transaction.id}
              data={transaction}
              tagName={tagsEntities[transaction.tagId]?.name}
              accountName={accountEntities[transaction.accountId]?.name}
            />
          ))
        }
      </div>
      {
        transactions.length > 0 &&
        <Pagination
          activePage={page}
          limit={LIMIT_PER_PAGE}
          total={transactions.length}
          onPageChange={setPage}
          className="mt-2"
        />
      }
    </>
  )
};
