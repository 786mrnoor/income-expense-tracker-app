import { users } from "@/api/users";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export const usersKeys = {
  all: ["users"] as const,
  me: () => [...usersKeys.all, "me"] as const,
};

export const usersQueries = {
  me: queryOptions({
    queryKey: usersKeys.me(),
    queryFn: users.me,
  }),

  signout: mutationOptions({
    mutationFn: users.signout,
    onSuccess: (_, __, ___, { client }) => {
      client.clear();
    },
  }),
};
