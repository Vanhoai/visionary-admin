import type { Failure } from "@/core"
import type { ApiService } from "../apis"

export class BaseRepository {
    protected readonly api: ApiService
    protected BASE_AUTH_URL = "/auth"
    protected BASE_ACCOUNT_URL = "/accounts"

    constructor(api: ApiService) {
        this.api = api
    }

    protected async safe<T>(fn: () => Promise<T>): Promise<T | Failure> {
        try {
            return await fn()
        } catch (exception) {
            return exception as Failure
        }
    }
}
