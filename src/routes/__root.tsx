import React from "react"
import { type QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { Toaster } from "@/components/ui/sonner"
import { NavigationProgress } from "@/components/navigation-progress"
import { GeneralError } from "@/features/errors/general-error"
import { NotFoundError } from "@/features/errors/not-found-error"

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    component: () => {
        return (
            <React.Fragment>
                <NavigationProgress />
                <Outlet />
                <Toaster duration={5000} />

                {import.meta.env.MODE === "development" && (
                    <React.Fragment>
                        <ReactQueryDevtools buttonPosition="bottom-left" />
                        <TanStackRouterDevtools position="bottom-right" />
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    },
    notFoundComponent: NotFoundError,
    errorComponent: GeneralError,
})
