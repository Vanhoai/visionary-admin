import { NotificationsFeature } from "@/presentation/features"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/settings/notifications")({
    component: NotificationsFeature,
})
