import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const experienceSchema = z.object({
    id: z.string(),
    position: z.string(),
    company: z.string(),
    location: z.string(),
    technologies: z.array(z.string()),
    isCurrent: z.boolean(),
    startDate: z.number(),
    endDate: z.number().nullable(),
})

export type Experience = z.infer<typeof experienceSchema>
