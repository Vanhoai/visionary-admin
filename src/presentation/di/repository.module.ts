import { AccountRepository, AuthRepository } from "@/adapters/repositories"
import { apiInstance } from "./core.module"

export const accountRepository = new AccountRepository(apiInstance)
export const authRepository = new AuthRepository(apiInstance)
