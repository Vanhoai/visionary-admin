import type { Failure, OAuth2Provider } from "@/core"
import type { IAuthRepository } from "@/domain/repositories"
import type { AuthResponse, OAuth2Response } from "@/domain/usecases"

import { BaseRepository } from "./base.repository"
import type { ApiService } from "../apis"
import type { AccountEntity } from "@/domain/entities"

export class AuthRepository extends BaseRepository implements IAuthRepository {
    constructor(api: ApiService) {
        super(api)
    }

    oauth2Init(provider: OAuth2Provider): Promise<OAuth2Response | Failure> {
        return super.safe(async () => {
            const response = await this.api.get<OAuth2Response>({
                endpoint: `${this.BASE_AUTH_URL}/oauth2/init`,
                params: {
                    provider: provider,
                },
            })

            return response
        })
    }

    oauth2GoogleCallback(code: string, state: string): Promise<AuthResponse | Failure> {
        return super.safe(async () => {
            const response = await this.api.post<AuthResponse>({
                endpoint: `${this.BASE_AUTH_URL}/oauth2/google-callback`,
                body: {
                    code: code,
                    state: state,
                },
            })

            return response
        })
    }

    oauth2GitHubCallback(code: string, state: string): Promise<AuthResponse | Failure> {
        return super.safe(async () => {
            const response = await this.api.post<AuthResponse>({
                endpoint: `${this.BASE_AUTH_URL}/oauth2/github-callback`,
                body: {
                    code: code,
                    state: state,
                },
            })

            return response
        })
    }

    signInWithEmail(email: string, password: string): Promise<AuthResponse | Failure> {
        return super.safe(async () => {
            const response = await this.api.post<AuthResponse>({
                endpoint: `${this.BASE_AUTH_URL}/sign-in`,
                body: {
                    email: email,
                    password: password,
                },
            })

            return response
        })
    }

    signUpWithEmail(email: string, password: string): Promise<AccountEntity | Failure> {
        return super.safe(async () => {
            const response = await this.api.post<AccountEntity>({
                endpoint: `${this.BASE_AUTH_URL}/sign-up`,
                body: {
                    email: email,
                    password: password,
                },
            })

            return response
        })
    }
}
