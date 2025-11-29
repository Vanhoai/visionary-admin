import type { StateStorage } from "zustand/middleware"
import { encryptedStorage } from "../di"

export function createEncryptedStorage(key: string): StateStorage {
    const cache = new Map<string, string>()

    return {
        getItem: (name: string): string | null => {
            // Try to get from cache first
            if (cache.has(name)) {
                return cache.get(name) || null
            }

            // If not in cache, try to load synchronously from localStorage
            // This will return encrypted data, which will be decrypted on next access
            const encryptedValue = localStorage.getItem(`${key}-${name}`)
            if (encryptedValue) {
                // Decrypt asynchronously and update cache
                encryptedStorage.getItem(name).then((decrypted) => {
                    if (decrypted) {
                        cache.set(name, decrypted)
                    }
                })
            }

            return cache.get(name) || null
        },

        setItem: (name: string, value: string): void => {
            cache.set(name, value)
            // Encrypt and save asynchronously
            encryptedStorage.setItem(name, value).catch((error) => {
                console.error("Failed to encrypt and save data:", error)
            })
        },

        removeItem: (name: string): void => {
            cache.delete(name)
            encryptedStorage.removeItem(name)
        },
    }
}
