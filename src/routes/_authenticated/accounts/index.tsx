import { createFileRoute } from "@tanstack/react-router"
import { AccountsFeature } from "@/presentation/features"

export const Route = createFileRoute("/_authenticated/accounts/")({
    component: AccountsFeature,
})
