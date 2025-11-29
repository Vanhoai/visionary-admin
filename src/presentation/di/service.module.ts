import { AccountService, AuthService } from "@/domain/services"
import { accountRepository, authRepository } from "./repository.module"

export const accountService = new AccountService(accountRepository)
export const authService = new AuthService(authRepository)
