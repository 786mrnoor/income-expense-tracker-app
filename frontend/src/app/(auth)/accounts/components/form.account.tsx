import Loader from "@/components/loader";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useEdit, useSetEdit } from "../edit-context/edit.context";
import { useMutation } from "@tanstack/react-query";
import { accountsQueries } from "@/queries/accounts";

function Form() {
  const editAccount = useEdit();
  const setEditAccount = useSetEdit();

  const addMutation = useMutation(accountsQueries.add);
  const updateMutation = useMutation(accountsQueries.update);

  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [previousAccount, setPreviousAccount] = useState(editAccount);

  if (previousAccount !== editAccount) {
    setPreviousAccount(editAccount);
    if (editAccount) {
      setName(editAccount.name);
    }
  }

  function handleReset() {
    setEditAccount(null);
    setName("");
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setError(null);

      if (editAccount) {
        await updateMutation.mutateAsync({
          params: editAccount.id,
          body: { name },
        });
        updateMutation.reset();
        toast.success("Account updated successfully.");
      } else {
        await addMutation.mutateAsync({ name });
        addMutation.reset();
        toast.success("Account added successfully.");
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

      console.error(error);
    }
    return;
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
        <button className="btn btn-primary">
          {editAccount ? "Update" : "Add"}
        </button>
        {editAccount && (
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
