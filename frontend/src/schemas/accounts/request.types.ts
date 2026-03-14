import type { AccountBaseSchema } from "./base.schema"

export type CreateAccountRequest = {
  name: AccountBaseSchema["name"]
}

export type UpdateAccountRequest = {
  params: AccountBaseSchema["id"]
  body: {
    name: AccountBaseSchema["name"]
  }
}

export type DeleteAccountParams = {
  id: AccountBaseSchema["id"]
}