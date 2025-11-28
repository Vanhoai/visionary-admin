import type { BaseEntity } from "./base.entity"

export interface BlogEntity extends BaseEntity {
    authorId: string
    categories: string[]
    name: string
    description: string
    isPublished: boolean
    markdown: string
    stars: number
    views: number
    estimatedReadTime: number
}
