import { accounts } from "@/api/accounts";
import type { AccountBaseSchema } from "@/schemas/accounts/base.schema";
import { sortByCreatedAt } from "@/utils/sort-by-created-at";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export const accountsKeys = {
  all: ["accounts"] as const,
};

export const accountsQueries = {
  all: queryOptions({
    queryKey: accountsKeys.all,
    queryFn: () => accounts.getAll().then(sortByCreatedAt),
  }),

  add: mutationOptions({
    mutationFn: accounts.add,
    onSuccess: (data, _, __, ctx) => {
      ctx.client.invalidateQueries({ queryKey: accountsKeys.all });
      ctx.client.setQueryData<AccountBaseSchema[]>(
        accountsKeys.all,
        (old = []) => [data, ...old],
      );
    },
  }),

  update: mutationOptions({
    mutationFn: accounts.update,
    onSuccess: (data, _, __, ctx) => {
      ctx.client.invalidateQueries({ queryKey: accountsKeys.all });
      ctx.client.setQueryData<AccountBaseSchema[]>(
        accountsKeys.all,
        (old = []) => old.map((t) => (t.id === data.id ? data : t)),
      );
    },
  }),

  delete: mutationOptions({
    mutationFn: accounts.delete,
    onSuccess: (_, id, __, ctx) => {
      ctx.client.invalidateQueries({ queryKey: accountsKeys.all });
      ctx.client.setQueryData<AccountBaseSchema[]>(
        accountsKeys.all,
        (old = []) => old.filter((t) => t.id !== id),
      );
    },
  }),
};
