import Loader from "@/components/loader";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useEdit, useSetEdit } from "../edit-context/edit.context";
import { useMutation } from "@tanstack/react-query";
import { tagsQueries } from "@/queries/tags";

function Form() {
  const tag = useEdit();
  const setEdit = useSetEdit();

  const addMutation = useMutation(tagsQueries.add);
  const updateMutation = useMutation(tagsQueries.update);

  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [previousTag, setPreviousTag] = useState(tag);

  if (previousTag !== tag) {
    setPreviousTag(tag);
    if (tag) {
      setName(tag.name);
    }
  }

  function handleReset() {
    setEdit(null);
    setName("");
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setError(null);

      if (tag) {
        await updateMutation.mutateAsync({
          params: tag.id,
          body: { name },
        });
        updateMutation.reset();
        toast.success("Tag updated successfully.");
      } else {
        await addMutation.mutateAsync({ name });
        addMutation.reset();
        toast.success("Tag added successfully.");
      }

      handleReset();
    } catch (error: unknown) {
      let message = "Something went wrong.";
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof error.message === "string"
      )
        message = error.message;

      console.error(error);
      setError(message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-body-secondary my-border-bottom"
    >
      <Loader show={addMutation.isPending || updateMutation.isPending} />
      <div className="input-group">
        <span className="input-group-text">Name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          required
        />
        <button className="btn btn-primary">{tag ? "Update" : "Add"}</button>
        {tag && (
          <button className="btn btn-danger" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>
      {error && <p className="text-danger m-0">{error}</p>}
    </form>
  );
}

export default Form;
