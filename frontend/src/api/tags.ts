import { authFetch } from "@/lib/auth-fetch"
import { createTagResponseSchema, tagListResponseSchema, updateTagResponseSchema } from "@/schemas/tags/response.schema"
import type { CreateTagBody, DeleteTagParams, UpdateTagRequest } from "@/schemas/tags/request.types"

export const tags = {
  getAll: () => authFetch({
    path: '/api/tags',
    method: 'GET',
    response: tagListResponseSchema
  }),

  add: (body: CreateTagBody) => authFetch({
    path: '/api/tags',
    method: 'POST',
    body,
    response: createTagResponseSchema
  }),

  update: (id: UpdateTagRequest["params"], body: UpdateTagRequest["body"]) => authFetch({
    path: `/api/tags/${id}`,
    method: 'PATCH',
    body,
    response: updateTagResponseSchema
  }),

  delete: (id: DeleteTagParams["id"]) => authFetch({
    path: `/api/tags/${id}`,
    method: 'DELETE',
  }),
}