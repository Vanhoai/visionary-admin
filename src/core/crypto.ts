export interface Cryptography {
    deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey>
    encrypt(data: string): Promise<string>
    decrypt(encryptedData: string): Promise<string>
    getDeviceKey(): string
}

export class CryptographyImpl implements Cryptography {
    private readonly encoder: TextEncoder
    private readonly IV_LENGTH = 12
    private readonly SALT_LENGTH = 16
    private readonly password: string

    constructor() {
        this.encoder = new TextEncoder()
        this.password = this.getDeviceKey()
    }

    async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
        const passwordKey = await crypto.subtle.importKey("raw", this.encoder.encode(password), "PBKDF2", false, [
            "deriveBits",
            "deriveKey",
        ])

        return crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: salt as BufferSource,
                iterations: 100000,
                hash: "SHA-256",
            },
            passwordKey,
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"],
        )
    }

    async encrypt(data: string): Promise<string> {
        try {
            const salt = crypto.getRandomValues(new Uint8Array(this.SALT_LENGTH))
            const iv = crypto.getRandomValues(new Uint8Array(this.IV_LENGTH))
            const key = await this.deriveKey(this.password, salt)

            const encryptedData = await crypto.subtle.encrypt(
                {
                    name: "AES-GCM",
                    iv: iv,
                },
                key,
                this.encoder.encode(data),
            )

            // Combine salt + iv + encrypted data
            const combined = new Uint8Array(salt.length + iv.length + encryptedData.byteLength)
            combined.set(salt, 0)
            combined.set(iv, salt.length)
            combined.set(new Uint8Array(encryptedData), salt.length + iv.length)

            // Convert to base64 for storage
            return btoa(String.fromCharCode(...combined))
        } catch (exception) {
            console.error("Encryption error:", exception)
            throw new Error("Failed to encrypt data")
        }
    }

    async decrypt(encryptedData: string): Promise<string> {
        try {
            // Decode from base64
            const combined = Uint8Array.from(atob(encryptedData), (c) => c.charCodeAt(0))

            // Extract salt, iv, and encrypted data
            const salt = combined.slice(0, this.SALT_LENGTH)
            const iv = combined.slice(this.SALT_LENGTH, this.SALT_LENGTH + this.IV_LENGTH)
            const data = combined.slice(this.SALT_LENGTH + this.IV_LENGTH)

            const key = await this.deriveKey(this.password, salt)
            const decryptedData = await crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv: iv,
                },
                key,
                data,
            )

            const decoder = new TextDecoder()
            return decoder.decode(decryptedData)
        } catch (error) {
            console.error("Decryption error:", error)
            throw new Error("Failed to decrypt data")
        }
    }

    getDeviceKey(): string {
        const userAgent = navigator.userAgent
        const language = navigator.language
        const platform = navigator.platform
        const hardwareConcurrency = navigator.hardwareConcurrency || 0
        const screenResolution = `${window.screen.width}x${window.screen.height}`
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

        const fingerprint = `${userAgent}-${language}-${platform}-${hardwareConcurrency}-${screenResolution}-${timezone}`

        // Hash
        let hash = 0
        for (let i = 0; i < fingerprint.length; i++) {
            const char = fingerprint.charCodeAt(i)
            hash = (hash << 5) - hash + char
            hash = hash & hash // Convert to 32bit integer
        }

        const key = `@visionary-${Math.abs(hash).toString(36)}`
        console.log({ key })
        return key
    }
}
