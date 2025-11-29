export const FailureCodes = {
    TimeoutError: "TimeoutError",
    NetworkError: "NetworkError",
    BadRequest: "BadRequest",
    Unauthorized: "Unauthorized",
    Forbidden: "Forbidden",
    NotFound: "NotFound",
    InternalServerError: "InternalServerError",
    MethodNotAllowed: "MethodNotAllowed",
    UnknownFailure: "UnknownFailure",
    Conflict: "Conflict",
    DatabaseError: "DatabaseError",
    ValidationError: "ValidationError",
    NotImplemented: "NotImplemented",
    InternalError: "InternalError",
    ExternalServiceError: "ExternalServiceError",
} as const

type FailureCode = (typeof FailureCodes)[keyof typeof FailureCodes]

export class Failure extends Error {
    code: FailureCode
    message: string

    constructor(code: FailureCode, message: string) {
        super(message)
        this.code = code
        this.message = message
    }
}
