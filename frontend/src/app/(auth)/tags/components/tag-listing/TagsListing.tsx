import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import Summary from "./summary";
import TagCard from "./tag-card";
import { tagsQueries } from "@/queries/tags";
import Loader from "@/components/loader";
import { useCallback } from "react";
import type { TagBaseSchema } from "@/schemas/tags/base.schema";
import { confirm } from "@/components/toasts/confirm/confirm";
import toast from "react-hot-toast";

function TagListing() {
  const { data: tags } = useSuspenseQuery(tagsQueries.all);

  const { mutateAsync, isPending } = useMutation(tagsQueries.delete);

  const handleDelete = useCallback(
    async (id: TagBaseSchema["id"]) => {
      const confirmed = await confirm({
        title: "Delete Tag",
        message: "Are you sure you want to delete this tag?",
      });

      if (confirmed) {
        try {
          await mutateAsync(id);
          toast.success("Tag deleted successfully.");
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

      <Summary tags={tags} />

      <ul className="sortable-list list-group p-3 mb-4">
        {tags.map((tag) => (
          <TagCard key={tag.id} data={tag} onDelete={handleDelete}></TagCard>
        ))}
      </ul>
    </>
  );
}

export { TagListing };
