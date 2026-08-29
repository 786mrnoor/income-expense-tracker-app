import type { AccountBaseSchema } from "@/schemas/accounts/base.schema";
import { createContext, useContext } from "react";

export const EditContext = createContext<AccountBaseSchema | null>(null);
export const SetEditContext = createContext<
  React.Dispatch<React.SetStateAction<AccountBaseSchema | null>> 
>(() => {});

export const useEdit = () => {
  return useContext(EditContext);
};

export const useSetEdit = () => {
  return useContext(SetEditContext);
};
