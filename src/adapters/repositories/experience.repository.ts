import type { Failure } from "@/core"
import type { ExperienceEntity } from "@/domain/entities"
import type { IExperienceRepository } from "@/domain/repositories"
import type { AddExperienceParams, UpdateExperienceParams } from "@/domain/usecases"

import { BaseRepository } from "./base.repository"
import type { ApiService } from "../apis"

export class ExperienceRepository extends BaseRepository implements IExperienceRepository {
    constructor(api: ApiService) {
        super(api)
    }

    async findExperiences(): Promise<ExperienceEntity[] | Failure> {
        return super.safe(async () => {
            const response = await this.api.get<ExperienceEntity[]>({
                endpoint: this.BASE_EXPERIENCE_URL,
            })

            return response
        })
    }

    async findExperience(id: string): Promise<ExperienceEntity | Failure> {
        return super.safe(async () => {
            const response = await this.api.get<ExperienceEntity>({
                endpoint: `${this.BASE_EXPERIENCE_URL}/${id}`,
            })

            return response
        })
    }

    async addExperience(params: AddExperienceParams): Promise<ExperienceEntity | Failure> {
        return super.safe(async () => {
            const response = await this.api.post<ExperienceEntity>({
                endpoint: this.BASE_EXPERIENCE_URL,
                body: {
                    position: params.position,
                    company: params.company,
                    technologies: params.technologies,
                    responsibility: params.responsibility,
                    location: params.location,
                    startDate: params.startDate,
                    endDate: params.endDate,
                    isCurrent: params.isCurrent,
                },
            })

            return response
        })
    }

    async updateExperience(params: UpdateExperienceParams): Promise<ExperienceEntity | Failure> {
        return super.safe(async () => {
            const response = await this.api.put<ExperienceEntity>({
                endpoint: `${this.BASE_EXPERIENCE_URL}/${params.id}`,
                body: {
                    position: params.position,
                    company: params.company,
                    technologies: params.technologies,
                    responsibility: params.responsibility,
                    location: params.location,
                    startDate: params.startDate,
                    endDate: params.endDate,
                    isCurrent: params.isCurrent,
                },
            })

            return response
        })
    }

    async deleteExperience(id: string): Promise<boolean | Failure> {
        return super.safe(async () => {
            const response = await this.api.delete<boolean>({
                endpoint: `${this.BASE_EXPERIENCE_URL}/${id}`,
            })

            return response
        })
    }
}
