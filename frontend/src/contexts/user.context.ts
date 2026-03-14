import type { AuthSchema } from "@/schemas/auth/auth.schema";
import { createContext, useContext } from "react";

export const UserContext = createContext<AuthSchema | null>(null);

export function useGetUser() {
  return useContext(UserContext);
}