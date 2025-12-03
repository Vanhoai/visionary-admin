import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const blogSchema = z.object({
    id: z.string(),
    authorId: z.string(),
    name: z.string(),
    isPublished: z.boolean(),
    stars: z.number().int(),
    views: z.number().int(),
    estimatedReadTime: z.number().int(),
    categories: z.array(z.string()),
    description: z.string().optional(),
    markdown: z.string().optional(),
    createdAt: z.number(),
    updatedAt: z.number(),
})

export type Blog = z.infer<typeof blogSchema>
