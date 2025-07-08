import type { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface QueryClientProviderrProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 0,
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const QueryClientProviderr: FC<QueryClientProviderrProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClientProviderr;
