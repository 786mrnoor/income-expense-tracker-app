import UserContextProvider from "@/contexts/user.provider";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ErrorScreen } from "@/components/error-screen/ErrorScreen";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorScreen>
      <Provider store={store}>
        <UserContextProvider>{children}</UserContextProvider>
      </Provider>
    </ErrorScreen>
  );
}
