import { Failure, FailureCodes, isEmptyString, isValidEmail, isValidPassword } from "@/core"

import type { IAuthRepository } from "../repositories"
import type {
    AuthResponse,
    AuthUseCases,
    AuthWithEmailParams,
    OAuth2GitHubCallbackParams,
    OAuth2GoogleCallbackParams,
    OAuth2Response,
} from "../usecases"
import type { AccountEntity } from "../entities"

export class AuthService implements AuthUseCases {
    private readonly authRepository: IAuthRepository
    constructor(authRepository: IAuthRepository) {
        this.authRepository = authRepository
    }

    oauth2Google(): Promise<OAuth2Response | Failure> {
        return this.authRepository.oauth2Init("google")
    }

    oauth2GitHub(): Promise<OAuth2Response | Failure> {
        return this.authRepository.oauth2Init("github")
    }

    async oauth2GoogleCallback(params: OAuth2GoogleCallbackParams): Promise<AuthResponse | Failure> {
        return this.authRepository.oauth2GoogleCallback(params.code, params.state)
    }

    async oauth2GitHubCallback(params: OAuth2GitHubCallbackParams): Promise<AuthResponse | Failure> {
        return this.authRepository.oauth2GitHubCallback(params.code, params.state)
    }

    async signInWithEmail(params: AuthWithEmailParams): Promise<AuthResponse | Failure> {
        if (isEmptyString(params.email)) return new Failure(FailureCodes.ValidationError, "Email cannot be empty 🙄")
        if (!isValidEmail(params.email)) return new Failure(FailureCodes.ValidationError, "Email is not valid 🙄")

        if (isEmptyString(params.password) || !isValidPassword(params.password))
            return new Failure(
                FailureCodes.ValidationError,
                "Password must be at least 8 characters, including uppercase, lowercase, number, and special character",
            )

        return await this.authRepository.signInWithEmail(params.email, params.password)
    }

    async signUpWithEmail(params: AuthWithEmailParams): Promise<AccountEntity | Failure> {
        if (isEmptyString(params.email)) return new Failure(FailureCodes.ValidationError, "Email cannot be empty 🙄")
        if (!isValidEmail(params.email)) return new Failure(FailureCodes.ValidationError, "Email is not valid 🙄")

        if (isEmptyString(params.password) || !isValidPassword(params.password))
            return new Failure(
                FailureCodes.ValidationError,
                "Password must be at least 8 characters, including uppercase, lowercase, number, and special character",
            )

        return await this.authRepository.signUpWithEmail(params.email, params.password)
    }

    signOut(): Promise<boolean | Failure> {
        return this.authRepository.signOut()
    }
}
