import type { Failure, OAuth2Provider } from "@/core"
import type { AuthResponse, OAuth2Response } from "../usecases"
import type { AccountEntity } from "../entities"

export interface IAuthRepository {
    oauth2Init(provider: OAuth2Provider): Promise<OAuth2Response | Failure>
    signInWithEmail(email: string, password: string): Promise<AuthResponse | Failure>
    signUpWithEmail(email: string, password: string): Promise<AccountEntity | Failure>
}
