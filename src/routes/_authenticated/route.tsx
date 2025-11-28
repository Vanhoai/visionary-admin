import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated")({
    beforeLoad: async () => {
        const isAuthenticated = false // Replace with real authentication check

        if (!isAuthenticated) {
            throw redirect({ to: "/auth" })
        }
    },
    component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
    return (
        <div>
            Header
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    )
}
