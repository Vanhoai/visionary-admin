import * as React from "react"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { NavigationProgress, Toaster } from "@/presentation/components"

const RootComponent: React.FC = () => {
    return (
        <React.Fragment>
            <NavigationProgress />
            <Outlet />
            <Toaster duration={5000} position="top-center" />

            {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
        </React.Fragment>
    )
}

export const Route = createRootRoute({
    component: RootComponent,
})
