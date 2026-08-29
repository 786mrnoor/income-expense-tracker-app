import { authFetch } from "@/lib/auth-fetch"
import type { AccountBaseSchema } from "@/schemas/accounts/base.schema"
import type { CreateAccountRequest, DeleteAccountParams, UpdateAccountRequest } from "@/schemas/accounts/request.types"
import { accountListResponseSchema, createAccountResponseSchema, getAccountByIdResponseSchema, updateAccountResponseSchema } from "@/schemas/accounts/response.schema"

export const accounts = {
  getAll: () => authFetch({
    path: '/api/accounts',
    method: 'GET',
    response: accountListResponseSchema
  }),

  getById: (id: AccountBaseSchema['id']) => authFetch({
    path: `/api/accounts/${id}`,
    method: 'GET',
    response: getAccountByIdResponseSchema
  }),

  add: (body: CreateAccountRequest) => authFetch({
    path: '/api/accounts',
    method: 'POST',
    body,
    response: createAccountResponseSchema
  }),

  update: (data: UpdateAccountRequest) => authFetch({
    path: `/api/accounts/${data.params}`,
    method: 'PATCH',
    body: data.body,
    response: updateAccountResponseSchema
  }),

  delete: (id: DeleteAccountParams["id"]) => authFetch({
    path: `/api/accounts/${id}`,
    method: 'DELETE',
  }),
}