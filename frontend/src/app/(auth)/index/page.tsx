import useTitle from "@/hooks/use-title";
import FilterForm from "./components/filter-form";
import TransactionList from "../../../components/transaction-list/transaction.list";
import Summary from "../../../components/transactions-summary/summary";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { removeAllTransactions } from "@/redux/transaction/transaction.slice";

export default function Index() {
  useTitle();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(removeAllTransactions());
    }
  }, []);

  return (
    <div className="my-container p-3 p-lg-4 index-page">
      <FilterForm />
      <hr />
      <Summary />
      <TransactionList />
    </div>
  );
}