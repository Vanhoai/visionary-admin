import type { BaseEntity } from "./base.entity"

export interface AccountEntity extends BaseEntity {
    email: string
    username: string
    avatar: string
    emailVerified: boolean
    bio: string
    isActive: boolean
}
