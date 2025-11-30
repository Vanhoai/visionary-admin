import { IS_AUTHENTICATED_KEY } from "@/core"
import { AppSideBar, SidebarInset, SidebarProvider } from "@/presentation/components"
import { LayoutProvider, SearchProvider } from "@/presentation/contexts"
import { encryptedStorage } from "@/presentation/di"
import { cn, getCookie } from "@/presentation/lib"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated")({
    beforeLoad: async () => {
        const isAuthenticated = (await encryptedStorage.getItem(IS_AUTHENTICATED_KEY)) === "true"
        if (!isAuthenticated) throw redirect({ to: "/auth" })
    },
    component: AuthenticatedLayout,
})

type AuthenticatedLayoutProps = {
    children?: React.ReactNode
}

function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    const defaultOpen = getCookie("sidebar_state") !== "false"

    return (
        <SearchProvider>
            <LayoutProvider>
                <SidebarProvider defaultOpen={defaultOpen}>
                    <AppSideBar />
                    <SidebarInset
                        className={cn(
                            // Set content container, so we can use container queries
                            "@container/content",

                            // If layout is fixed, set the height
                            // to 100svh to prevent overflow
                            "has-data-[layout=fixed]:h-svh",

                            // If layout is fixed and sidebar is inset,
                            // set the height to 100svh - spacing (total margins) to prevent overflow
                            "peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]",
                        )}
                    >
                        {children ?? <Outlet />}
                    </SidebarInset>
                </SidebarProvider>
            </LayoutProvider>
        </SearchProvider>
    )
}
