import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import "./i18n/i18n";

// 1. Create the QueryClient instance
// This manages all your caching and background updates
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevents auto-reload when clicking back to the tab
      retry: 1, // If API fails, try 1 more time before showing error
      staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    },
  },
});

createRoot(document.getElementById("root")!).render(
  // 2. Wrap your entire App in the Provider
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);