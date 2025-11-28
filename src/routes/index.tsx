import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
    beforeLoad: async () => {
        const isAuthenticated = false

        if (!isAuthenticated) {
            throw redirect({ to: "/auth" })
        }

        throw redirect({ to: "/dashboard" })
    },
})
