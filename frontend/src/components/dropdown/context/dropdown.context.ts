import { createContext, useContext, type Dispatch, type SetStateAction } from "react";

export const DropdwonContext = createContext(false);
export const DropdwonDispatchContext = createContext<Dispatch<SetStateAction<boolean>>>(() => {});

export function useDropdown() {
  return useContext(DropdwonContext);
}

export function useDropdownDispatch() {
  return useContext(DropdwonDispatchContext);
}