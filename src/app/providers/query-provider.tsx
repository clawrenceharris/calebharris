/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";
import { normalizeError, inferErrorContext } from "@/utils/errors";
import { shouldShowToast, showErrorToast } from "@/lib/errors/error-toast";
import { AppError } from "@/types/errors";

export function QueryProvider({ children }: { children: ReactNode }) {

  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5 minutes
          gcTime: 10 * 60 * 1000, // 10 minutes
          retry: (failureCount, error) => {
            // Don't retry on client errors (4xx)
            if (error && typeof error === "object" && "status" in error) {
              const status = (error as any).status;
              if (status >= 400 && status < 500) {
                return false;
              }
            }
            // Retry up to 3 times for other errors
            return failureCount < 3;
          },
          retryDelay: (attemptIndex) =>
            Math.min(1000 * 2 ** attemptIndex, 30000),
          refetchOnWindowFocus: true,
          refetchOnReconnect: true,
        },

        mutations: {
          retry: (failureCount, error) => {
            // Don't retry mutations on client errors
            if (error && typeof error === "object" && "status" in error) {
              const status = (error as any).status;
              if (status >= 400 && status < 500) {
                return false;
              }
            }
            // Retry up to 2 times for server errors
            return failureCount < 2;
          },

          onError: (error, variables) => {
            // Normalize the error
            const normalizedError = normalizeError(error);

            // Get mutation info from mutation cache
            // Find the most recent mutation that matches these variables
            const mutationCache = client.getMutationCache();
            const mutations = mutationCache.getAll();
            const matchingMutation =
              mutations.find(
                (m) =>
                  m.state.variables === variables ||
                  JSON.stringify(m.state.variables) ===
                    JSON.stringify(variables)
              ) || mutations[mutations.length - 1]; // Fallback to most recent

            // Get mutation metadata
            const mutationOptions = (matchingMutation?.options as any) || {};
            const meta = mutationOptions.meta || {};

            // Infer context about what operation failed
            const mutationContext = {
              mutationKey: mutationOptions.mutationKey,
              operation: meta.errorContext,
            };
            const errorContext = inferErrorContext(
              normalizedError,
              mutationContext
            );

           
            // Check if we should show toast (respects meta.skipToast)
            const shouldShow = shouldShowToast();

            if (shouldShow) {
              // Show toast with "See More" action
              // The actual modal opening will be handled via mutation observer
              // Show toast with "See More" action
              showErrorToast(normalizedError, {
                onShowDetails: () => {
                  // Access error modal handler via window
                  if (typeof window !== "undefined") {
                    const errorHandler = (
                      window as {
                        __showErrorModal?: (
                          error: AppError,
                          context?: string
                        ) => void;
                      }
                    ).__showErrorModal;
                    if (errorHandler) {
                      errorHandler(normalizedError, errorContext);
                    }
                  }
                },
              });
            }
          },
        },
      },
    });

    return client;
  });


  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
     
    </QueryClientProvider>
  );
}
