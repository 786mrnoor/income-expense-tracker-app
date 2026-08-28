import React, { useState } from "react";
import { EditContext, SetEditContext } from "./edit.context";
import type { TagBaseSchema } from "@/schemas/tags/base.schema";

type EditProviderProps = {
  children: React.ReactNode;
};

function EditProvider({ children }: EditProviderProps) {
  const [edit, setEdit] = useState<TagBaseSchema | null>(null);

  return (
    <EditContext value={edit}>
      <SetEditContext value={setEdit}>{children}</SetEditContext>
    </EditContext>
  );
}

export { EditProvider };
