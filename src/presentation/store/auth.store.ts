import type { Option } from "@/core"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthStore {
    // State
    isAuthenticated: boolean
    accessToken: Option<string>
    refreshToken: Option<string>

    // Actions
    setAuthenticated: (isAuthenticated: boolean) => void
    setAccessToken: (token: Option<string>) => void
    setRefreshToken: (token: Option<string>) => void
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
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
            }),
        },
    ),
)
