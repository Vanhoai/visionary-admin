import { createFileRoute } from "@tanstack/react-router"
import { DashboardFeature } from "@/presentation/features"

export const Route = createFileRoute("/_authenticated/dashboard/")({
    component: DashboardFeature,
})
