import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const projectSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    github: z.string(),
    tags: z.array(z.string()),
    createdAt: z.number(),
    updatedAt: z.number(),
})

export type Project = z.infer<typeof projectSchema>
