import type { Failure } from "@/core"

import type { ExperienceEntity } from "../entities"
import type { IExperienceRepository } from "../repositories"
import type { AddExperienceParams, ManageExperienceUseCase, UpdateExperienceParams } from "../usecases"

export class ExperienceService implements ManageExperienceUseCase {
    private readonly experienceRepository: IExperienceRepository
    constructor(experienceRepository: IExperienceRepository) {
        this.experienceRepository = experienceRepository
    }

    findExperiences(): Promise<ExperienceEntity[] | Failure> {
        return this.experienceRepository.findExperiences()
    }

    findExperience(id: string): Promise<ExperienceEntity | Failure> {
        return this.experienceRepository.findExperience(id)
    }

    addExperience(params: AddExperienceParams): Promise<ExperienceEntity | Failure> {
        return this.experienceRepository.addExperience(params)
    }

    updateExperience(params: UpdateExperienceParams): Promise<ExperienceEntity | Failure> {
        return this.experienceRepository.updateExperience(params)
    }

    deleteExperience(id: string): Promise<boolean | Failure> {
        return this.experienceRepository.deleteExperience(id)
    }
}
