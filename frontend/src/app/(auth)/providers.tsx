import UserContextProvider from "@/contexts/user.provider";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <UserContextProvider>
        {children}
      </UserContextProvider>
    </Provider>
  )
}