import { transactions } from "@/api/transactions";
import type { TransactionBaseSchema } from "@/schemas/transactions/base.schema";
import type { GetTransactionRequestQuery } from "@/schemas/transactions/request.types";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export const transactionsKeys = {
  all: ["transactions"] as const,
  lists: () => [...transactionsKeys.all, "list"] as const,
  list: (data: GetTransactionRequestQuery) =>
    [...transactionsKeys.lists(), data] as const,
  details: () => [...transactionsKeys.all, "detail"] as const,
  detail: (id: TransactionBaseSchema["id"]) =>
    [...transactionsKeys.details(), id] as const,
};

export const transactionsQueries = {
  list: (data: GetTransactionRequestQuery) =>
    queryOptions({
      queryKey: transactionsKeys.list(data),
      queryFn: () => transactions.getAll(data),
    }),

  getById: (id: TransactionBaseSchema["id"]) =>
    queryOptions({
      queryKey: transactionsKeys.detail(id),
      queryFn: () => transactions.get(id),
    }),

  add: mutationOptions({
    mutationFn: transactions.add,
    onSuccess: (_, __, ___, ctx) => {
      ctx.client.resetQueries({ queryKey: transactionsKeys.lists() });
    },
  }),

  update: mutationOptions({
    mutationFn: transactions.update,
    onSuccess: (data, _, __, ctx) => {
      ctx.client.resetQueries({ queryKey: transactionsKeys.lists() });
      ctx.client.resetQueries({
        queryKey: transactionsKeys.detail(data.id),
        exact: true,
      });
    },
  }),

  delete: mutationOptions({
    mutationFn: transactions.delete,
    onSuccess: (_, id, __, ctx) => {
      ctx.client.resetQueries({ queryKey: transactionsKeys.lists() });
      ctx.client.resetQueries({
        queryKey: transactionsKeys.detail(id),
        exact: true,
      });
    },
  }),
};
