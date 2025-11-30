import type { Failure } from "@/core"
import type { AccountEntity } from "../entities"

export interface OAuth2Response {
    authorizationUrl: string
    state: string
}

export interface AuthWithEmailParams {
    email: string
    password: string
}

export interface AuthResponse {
    accessToken: string
    refreshToken: string
}

export interface OAuth2GoogleCallbackParams {
    code: string
    state: string
}

export interface OAuth2GitHubCallbackParams {
    // Change later if GitHub uses different param names
    code: string
    state: string
}

export interface AuthUseCases {
    oauth2Google(): Promise<OAuth2Response | Failure>
    oauth2GitHub(): Promise<OAuth2Response | Failure>
    oauth2GoogleCallback(params: OAuth2GoogleCallbackParams): Promise<AuthResponse | Failure>
    oauth2GitHubCallback(params: OAuth2GitHubCallbackParams): Promise<AuthResponse | Failure>
    signInWithEmail(params: AuthWithEmailParams): Promise<AuthResponse | Failure>
    signUpWithEmail(params: AuthWithEmailParams): Promise<AccountEntity | Failure>
}
