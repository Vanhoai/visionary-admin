import * as React from "react"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { Toaster } from "@/presentation/components"

const RootComponent: React.FC = () => {
    return (
        <React.Fragment>
            <Outlet />
            {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
            <Toaster position="top-right" richColors />
        </React.Fragment>
    )
}

export const Route = createRootRoute({
    component: RootComponent,
})
