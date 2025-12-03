import { z } from "zod"

const accountRoleSchema = z.union([z.literal("ADMIN"), z.literal("NORMAl")])

const accountSchema = z.object({
    id: z.string(),
    username: z.string(),
    avatar: z.url(),
    email: z.email(),
    emailVerified: z.boolean(),
    bio: z.string(),
    isActive: z.boolean(),
    role: accountRoleSchema,
    createdAt: z.number(),
    updatedAt: z.number(),
})

export type Account = z.infer<typeof accountSchema>

export const accountsSchema = z.array(accountSchema)
