import { Failure } from "./failure"

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isValidEmail = (email: string): boolean => emailRegex.test(email)

export const isValidPassword = (password: string): boolean => password.length >= 8

export const isEmptyString = (value: string): boolean => value.trim().length === 0

export const isFailure = <T>(value: T | Failure): value is Failure => value instanceof Failure

export const isSome = <T>(option: T | null | undefined): option is T => option !== null && option !== undefined

export const isNone = <T>(option: T | null | undefined): option is null | undefined =>
    option === null || option === undefined
