import { AccountService, AuthService, ExperienceService } from "@/domain/services"
import { accountRepository, authRepository, experienceRepository } from "./repository.module"

export const accountService = new AccountService(accountRepository)
export const authService = new AuthService(authRepository)
export const experienceService = new ExperienceService(experienceRepository)
