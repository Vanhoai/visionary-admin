import type { BaseEntity } from "./base.entity"

export interface ExperienceEntity extends BaseEntity {
    position: string
    technologies: string[]
    responsibility: string[]
    company: string
    location: string
    startDate: number
    endDate: number | null
    isCurrent: boolean
}
