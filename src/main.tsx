import * as React from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Import the generated route tree
import { routeTree } from "./routeTree.gen"
import { ThemeProvider } from "./presentation/contexts"
import "./index.css"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: () => false,
            refetchOnWindowFocus: import.meta.env.PROD,
            staleTime: 10 * 1000,
        },
        mutations: {
            onError: () => {},
        },
    },
    queryCache: new QueryCache({
        onError: () => {},
    }),
})

// Create a new router instance
const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
