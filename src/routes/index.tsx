import { IS_AUTHENTICATED_KEY } from "@/core"
import { encryptedStorage } from "@/presentation/di"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
    beforeLoad: async () => {
        const isAuthenticated = (await encryptedStorage.getItem(IS_AUTHENTICATED_KEY)) === "true"

        if (!isAuthenticated) {
            throw redirect({ to: "/auth" })
        }

        throw redirect({ to: "/dashboard" })
    },
})
