import type { Failure, OAuth2Provider } from "@/core"
import type { AuthResponse, OAuth2Response } from "../usecases"
import type { AccountEntity } from "../entities"

export interface IAuthRepository {
    oauth2Init(provider: OAuth2Provider): Promise<OAuth2Response | Failure>
    oauth2GoogleCallback(code: string, state: string): Promise<AuthResponse | Failure>
    oauth2GitHubCallback(code: string, state: string): Promise<AuthResponse | Failure>
    signInWithEmail(email: string, password: string): Promise<AuthResponse | Failure>
    signUpWithEmail(email: string, password: string): Promise<AccountEntity | Failure>
}
