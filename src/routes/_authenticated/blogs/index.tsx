import { createFileRoute } from "@tanstack/react-router"
import { BlogsFeature } from "@/presentation/features"

export const Route = createFileRoute("/_authenticated/blogs/")({
    component: BlogsFeature,
})
