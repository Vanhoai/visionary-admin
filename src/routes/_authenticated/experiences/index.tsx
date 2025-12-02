import { createFileRoute } from "@tanstack/react-router"
import { ExperiencesFeature } from "@/presentation/features"

export const Route = createFileRoute("/_authenticated/experiences/")({
    component: ExperiencesFeature,
})
