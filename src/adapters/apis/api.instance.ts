import { Failure, FailureCodes } from "@/core"

export interface ApiConfig {
    baseUrl: string
    timeout?: number
    headers: Record<string, string>
}

export interface HttpResponse<T> {
    code: string
    message: string
    payload: T
}

export class ApiService {
    private baseUrl: string
    private timeout: number
    private defaultHeaders: Record<string, string>

    constructor(config: ApiConfig) {
        this.baseUrl = config.baseUrl
        this.timeout = config.timeout || 30000
        this.defaultHeaders = {
            "Content-Type": "application/json",
            ...config.headers,
        }
    }

    async get<T>({
        endpoint,
        params,
        headers,
    }: {
        endpoint: string
        params?: Record<string, string | number | boolean>
        headers?: Record<string, string>
    }): Promise<T> {
        if (params) endpoint += this.parseQueryParams(params)
        return this.call<T>("GET", endpoint, undefined, headers)
    }

    async post<T>({
        endpoint,
        body,
        headers,
    }: {
        endpoint: string
        body?: unknown
        headers?: Record<string, string>
    }): Promise<T> {
        return this.call<T>("POST", endpoint, body, headers)
    }

    async put<T>({
        endpoint,
        body,
        headers,
    }: {
        endpoint: string
        body?: unknown
        headers?: Record<string, string>
    }): Promise<T> {
        return this.call<T>("PUT", endpoint, body, headers)
    }

    async delete<T>({ endpoint, headers }: { endpoint: string; headers?: Record<string, string> }): Promise<T> {
        return this.call<T>("DELETE", endpoint, undefined, headers)
    }

    async patch<T>({
        endpoint,
        body,
        headers,
    }: {
        endpoint: string
        body?: unknown
        headers?: Record<string, string>
    }): Promise<T> {
        return this.call<T>("PATCH", endpoint, body, headers)
    }

    private async call<T>(
        method: string,
        endpoint: string,
        body?: unknown,
        headers?: Record<string, string>,
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), this.timeout)

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    ...this.defaultHeaders,
                    ...headers,
                },
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            })

            clearTimeout(timeoutId)

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                const message = errorData?.message ? errorData.message : "API request failed"

                const code = errorData?.code ? errorData.code : response.status.toString()

                throw new Failure(code, message)
            }

            const httpResponse = (await response.json()) as HttpResponse<T>
            return httpResponse.payload as T
        } catch (error) {
            clearTimeout(timeoutId)

            // Ensure all errors are wrapped in Failure
            if (error instanceof Failure) {
                throw error
            } else if (error instanceof Error) {
                if (error.name === "AbortError") {
                    throw new Failure(FailureCodes.TimeoutError, "Request timed out")
                }

                throw new Failure(FailureCodes.NetworkError, error.message || "Network error occurred")
            } else {
                throw new Failure(FailureCodes.UnknownFailure, "An unknown error occurred")
            }
        }
    }

    withAuth(accessToken: string) {
        this.defaultHeaders["Authorization"] = `Bearer ${accessToken}`
    }

    removeAuth() {
        delete this.defaultHeaders["Authorization"]
    }

    parseQueryParams(params: Record<string, string | number | boolean>) {
        const queryString = Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`)
            .join("&")

        return queryString ? `?${queryString}` : ""
    }
}

export const apiInstance = new ApiService({
    baseUrl: import.meta.env.VITE_BASE_API_URI,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
})
