import { z } from "zod"
import type { ExperienceEntity } from "@/domain/entities"

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

function fromEntityToSchema(entity: ExperienceEntity): Experience {
    return {
        id: entity.id,
        position: entity.position,
        company: entity.company,
        location: entity.location,
        technologies: entity.technologies,
        isCurrent: entity.isCurrent,
        startDate: entity.startDate,
        endDate: entity.endDate,
    }
}

export function fromEntitiesToSchemas(entities: ExperienceEntity[]): Experience[] {
    return entities.map(fromEntityToSchema)
}
