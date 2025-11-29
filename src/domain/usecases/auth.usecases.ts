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

export interface AuthUseCases {
    oauth2Google(): Promise<OAuth2Response | Failure>
    oauth2GitHub(): Promise<OAuth2Response | Failure>
    signInWithEmail(params: AuthWithEmailParams): Promise<AuthResponse | Failure>
    signUpWithEmail(params: AuthWithEmailParams): Promise<AccountEntity | Failure>
}
