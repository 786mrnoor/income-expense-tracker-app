import { authFetch } from "@/lib/auth-fetch";
import { type TransactionBaseSchema } from "@/schemas/transactions/base.schema";
import type { CreateTransactionRequest, GetTransactionRequestQuery } from "@/schemas/transactions/request.types";
import { createTransactionResponseSchema, transasctionGetResponseSchema, transasctionListResponseSchema, updateTransactionResponseSchema } from "@/schemas/transactions/response.schema";
import type { NoExtraProperties } from "@/types/utilis";

export const transactions = {
  getAll: <T extends GetTransactionRequestQuery>(query: NoExtraProperties<GetTransactionRequestQuery, T>) => authFetch({
    path: '/api/transactions',
    method: 'GET',
    response: transasctionListResponseSchema,
    query
  }),

  get: (id: TransactionBaseSchema["id"]) => authFetch({
    path: `/api/transactions/${id}`,
    method: 'GET',
    response: transasctionGetResponseSchema,
  }),

  add: (body: CreateTransactionRequest) => authFetch({
    path: '/api/transactions',
    method: 'POST',
    body,
    response: createTransactionResponseSchema
  }),

  delete: (id: TransactionBaseSchema["id"]) => authFetch({
    path: `/api/transactions/${id}`,
    method: 'DELETE',
  }),

  update: (id: TransactionBaseSchema["id"], body: CreateTransactionRequest) => authFetch({
    path: `/api/transactions/${id}`,
    method: 'PATCH',
    body,
    response: updateTransactionResponseSchema
  }),
}