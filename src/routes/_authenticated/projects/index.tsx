import { ProjectsFeature } from "@/presentation/features"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/projects/")({
    component: ProjectsFeature,
})
