import { tags } from "@/api/tags";
import type { TagBaseSchema } from "@/schemas/tags/base.schema";
import { sortByCreatedAt } from "@/utils/sort-by-created-at";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export const tagsKeys = {
  all: ["tags"] as const,
};

export const tagsQueries = {
  all: queryOptions({
    queryKey: tagsKeys.all,
    queryFn: () => tags.getAll().then(sortByCreatedAt),
  }),

  add: mutationOptions({
    mutationFn: tags.add,
    onSuccess: (data, _, __, ctx) => {
      ctx.client.invalidateQueries({ queryKey: tagsKeys.all });
      ctx.client.setQueryData<TagBaseSchema[]>(tagsKeys.all, (old = []) => [
        data,
        ...old,
      ]);
    },
  }),

  update: mutationOptions({
    mutationFn: tags.update,
    onSuccess: (data, _, __, ctx) => {
      ctx.client.invalidateQueries({ queryKey: tagsKeys.all });
      ctx.client.setQueryData<TagBaseSchema[]>(tagsKeys.all, (old = []) =>
        old.map((t) => (t.id === data.id ? data : t)),
      );
    },
  }),

  delete: mutationOptions({
    mutationFn: tags.delete,
    onSuccess: (_, id, __, ctx) => {
      ctx.client.invalidateQueries({ queryKey: tagsKeys.all });
      ctx.client.setQueryData<TagBaseSchema[]>(tagsKeys.all, (old = []) =>
        old.filter((t) => t.id !== id),
      );
    },
  }),
};
