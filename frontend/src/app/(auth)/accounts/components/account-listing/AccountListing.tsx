import Summary from "./summary";
import AccountCard from "./account-card";
import { accountsQueries } from "@/queries/accounts";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import Loader from "@/components/loader";
import { confirm } from "@/components/toasts/confirm/confirm";
import { useCallback } from "react";
import type { AccountBaseSchema } from "@/schemas/accounts/base.schema";
import toast from "react-hot-toast";

function AccountListing() {
  const { data: accounts } = useSuspenseQuery(accountsQueries.all);

  const { mutateAsync, isPending } = useMutation(accountsQueries.delete);

  const handleDelete = useCallback(
    async (id: AccountBaseSchema["id"]) => {
      const confirmed = await confirm({
        title: "Delete Account",
        message: "Are you sure you want to delete this account?",
      });

      if (confirmed) {
        try {
          await mutateAsync(id);
          toast.success("Account deleted successfully.");
        } catch (error: unknown) {
          let message = "Something Went Wrong";
          if (error instanceof Error) {
            message = error.message;
          }
          toast.error(message);
          console.error(error);
        }
      }
    },
    [mutateAsync],
  );

  return (
    <>
      <Loader show={isPending} />

      <Summary accounts={accounts} />

      <ul className="sortable-list list-group p-3 mb-4">
        {accounts.map((account) => (
          <AccountCard
            key={account.id}
            data={account}
            onDelete={handleDelete}
          ></AccountCard>
        ))}
      </ul>
    </>
  );
}

export { AccountListing };
