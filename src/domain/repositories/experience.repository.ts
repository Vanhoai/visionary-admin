import type { Failure } from "@/core"
import type { ExperienceEntity } from "../entities"
import type { AddExperienceParams, UpdateExperienceParams } from "../usecases"

export interface IExperienceRepository {
    findExperiences(): Promise<ExperienceEntity[] | Failure>
    findExperience(id: string): Promise<ExperienceEntity | Failure>
    addExperience(params: AddExperienceParams): Promise<ExperienceEntity | Failure>
    updateExperience(params: UpdateExperienceParams): Promise<ExperienceEntity | Failure>
    deleteExperience(id: string): Promise<boolean | Failure>
}
