import { BrowserRouter } from "react-router";
import { AppRoutes } from "./app/routes";
import { Suspense } from "react";
import Loader from "./components/loader";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, networkMode: "always" },
    mutations: { networkMode: "always" },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loader show={true} />}>{AppRoutes}</Suspense>
        <ReactQueryDevtools />
      </QueryClientProvider>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
