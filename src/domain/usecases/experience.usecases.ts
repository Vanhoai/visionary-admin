import type { Failure } from "@/core"
import type { ExperienceEntity } from "../entities"

export interface AddExperienceParams {
    position: string
    company: string
    technologies: string[]
    responsibility: string[]
    location: string
    startDate: number
    endDate: number | null
    isCurrent: boolean
}

export interface UpdateExperienceParams {
    id: string
    position: string | null
    company: string | null
    technologies: string[] | null
    responsibility: string[] | null
    location: string | null
    startDate: number | null
    endDate: number | null
    isCurrent: boolean | null
}

export interface ManageExperienceUseCase {
    findExperiences(): Promise<ExperienceEntity[] | Failure>
    findExperience(id: string): Promise<ExperienceEntity | Failure>
    addExperience(params: AddExperienceParams): Promise<ExperienceEntity | Failure>
    updateExperience(params: UpdateExperienceParams): Promise<ExperienceEntity | Failure>
    deleteExperience(id: string): Promise<boolean | Failure>
}
