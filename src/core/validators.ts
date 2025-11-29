import { Failure } from "./failure"

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isValidEmail = (email: string): boolean => emailRegex.test(email)

export const isValidPassword = (password: string): boolean =>
    password.length >= 8

export const isEmptyString = (value: string): boolean =>
    value.trim().length === 0

export const isFailure = <T>(value: T | Failure): value is Failure =>
    value instanceof Failure
