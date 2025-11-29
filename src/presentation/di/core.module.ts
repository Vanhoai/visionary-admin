import { CryptographyImpl, EncryptedStorage } from "@/core"
export { apiInstance } from "@/adapters/apis"

export const cryptography = new CryptographyImpl()
export const encryptedStorage = new EncryptedStorage("@visionary:encrypted", cryptography)
