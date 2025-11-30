import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { ACCESS_TOKEN_KEY, IS_AUTHENTICATED_KEY, REFRESH_TOKEN_KEY, type Option } from "@/core"

import { createEncryptedStorage } from "./encrypted_zutand.store"
import { encryptedStorage } from "../di"

interface AuthStore {
    // State
    isAuthenticated: boolean
    accessToken: Option<string>
    refreshToken: Option<string>

    // Actions
    authSuccess: (accessToken: string, refreshToken: string) => Promise<void>
    resetAuth: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            authSuccess: async (accessToken, refreshToken) => {
                await encryptedStorage.setItem(IS_AUTHENTICATED_KEY, "true")
                await encryptedStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
                await encryptedStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)

                set({
                    isAuthenticated: true,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                })
            },
            resetAuth: () => {
                encryptedStorage.removeItem(IS_AUTHENTICATED_KEY)
                encryptedStorage.removeItem(ACCESS_TOKEN_KEY)
                encryptedStorage.removeItem(REFRESH_TOKEN_KEY)

                set({
                    isAuthenticated: false,
                    accessToken: null,
                    refreshToken: null,
                })
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => createEncryptedStorage("auth-encrypted")),
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
            }),
        },
    ),
)
