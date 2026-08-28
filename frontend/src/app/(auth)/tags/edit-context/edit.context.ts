import type { TagBaseSchema } from "@/schemas/tags/base.schema";
import { createContext, useContext } from "react";

export const EditContext = createContext<TagBaseSchema | null>(null);
export const SetEditContext = createContext<
  React.Dispatch<React.SetStateAction<TagBaseSchema | null>> 
>(() => {});

export const useEdit = () => {
  return useContext(EditContext);
};

export const useSetEdit = () => {
  return useContext(SetEditContext);
};
