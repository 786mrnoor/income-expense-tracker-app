import type { TagBaseSchema } from "./base.schema"

export type CreateTagBody = {
  name: TagBaseSchema["name"]
}

export type UpdateTagRequest = {
  params: TagBaseSchema["id"]
  body: {
    name: TagBaseSchema["name"]
  }
}

export type DeleteTagParams = {
  id: TagBaseSchema["id"]
}