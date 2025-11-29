import type { StateStorage } from "zustand/middleware"
import type { Cryptography } from "./crypto"

export class EncryptedStorage implements StateStorage {
    private readonly key: string
    private readonly cryptography: Cryptography

    constructor(key: string, cryptography: Cryptography) {
        this.key = key
        this.cryptography = cryptography
    }

    async getItem(name: string): Promise<string | null> {
        try {
            const encryptedValue = localStorage.getItem(`${this.key}-${name}`)
            if (!encryptedValue) return null

            const decryptedValue = await this.cryptography.decrypt(encryptedValue)
            return decryptedValue
        } catch (exception) {
            console.error("Failed to get encrypted item:", exception)
            this.removeItem(name)
            return null
        }
    }

    async setItem(name: string, value: string): Promise<void> {
        try {
            const encryptedValue = await this.cryptography.encrypt(value)
            localStorage.setItem(`${this.key}-${name}`, encryptedValue)
        } catch (error) {
            console.error("Failed to set encrypted item:", error)
            throw error
        }
    }

    removeItem(name: string): void {
        localStorage.removeItem(`${this.key}-${name}`)
    }
}
