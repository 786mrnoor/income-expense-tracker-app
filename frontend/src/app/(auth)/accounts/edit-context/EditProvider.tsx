import React, { useState } from "react";
import { EditContext, SetEditContext } from "./edit.context";
import type { AccountBaseSchema } from "@/schemas/accounts/base.schema";

type EditProviderProps = {
  children: React.ReactNode;
};

function EditProvider({ children }: EditProviderProps) {
  const [edit, setEdit] = useState<AccountBaseSchema | null>(null);

  return (
    <EditContext value={edit}>
      <SetEditContext value={setEdit}>{children}</SetEditContext>
    </EditContext>
  );
}

export { EditProvider };
