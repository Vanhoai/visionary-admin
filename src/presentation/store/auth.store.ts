import type { Option } from "@/core"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { createEncryptedStorage } from "./encrypted_zutand.store"

interface AuthStore {
    // State
    isAuthenticated: boolean
    accessToken: Option<string>
    refreshToken: Option<string>

    // Actions
    setAuthenticated: (isAuthenticated: boolean) => void
    setAccessToken: (token: Option<string>) => void
    setRefreshToken: (token: Option<string>) => void
    authSuccess: (accessToken: string, refreshToken: string) => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
            setAccessToken: (token) => set({ accessToken: token }),
            setRefreshToken: (token) => set({ refreshToken: token }),
            authSuccess: (accessToken, refreshToken) =>
                set({
                    isAuthenticated: true,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                }),
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
