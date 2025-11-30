import * as React from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useAuthStore } from "@/presentation/store"
import { Spinner } from "@/presentation/components"
import { toast } from "sonner"
import { authService, encryptedStorage } from "@/presentation/di"
import { isFailure, OAUTH2_STATE_KEY } from "@/core"

const AuthCallback: React.FC = () => {
    const navigate = useNavigate()
    const { authSuccess } = useAuthStore()
    const [status, setStatus] = React.useState<"processing" | "success" | "error">("processing")

    React.useEffect(() => {
        const handleCallback = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search)
                const code = urlParams.get("code")
                const state = urlParams.get("state")
                const error = urlParams.get("error")

                console.log("OAuth Callback - Code:", code?.substring(0, 10) + "...")
                console.log("OAuth Callback - State:", state)

                if (error) {
                    setStatus("error")
                    toast.error("Google Sign-In Failed", {
                        description: error,
                    })
                    setTimeout(() => navigate({ to: "/auth" }), 2000)
                    return
                }

                // Validate parameters
                if (!code || !state) {
                    setStatus("error")
                    toast.error("Invalid callback parameters")
                    setTimeout(() => navigate({ to: "/auth" }), 2000)
                    return
                }

                // Verify state (CSRF protection)
                const savedState = await encryptedStorage.getItem(OAUTH2_STATE_KEY)
                encryptedStorage.removeItem(OAUTH2_STATE_KEY)
                console.log({ savedState })

                if (state !== savedState) {
                    setStatus("error")
                    toast.error("Invalid state - possible CSRF attack")
                    setTimeout(() => navigate({ to: "/auth" }), 2000)
                    return
                }

                console.log("Calling backend oauth2 callback...")
                console.log({ code, state })

                // Call backend to exchange code for tokens
                const result = await authService.oauth2GoogleCallback({ code, state })
                if (isFailure(result)) {
                    setStatus("error")
                    console.log("OAuth Callback - Failure:", result)
                    toast.error("Authentication failed", {
                        description: result.message,
                    })
                    setTimeout(() => navigate({ to: "/auth" }), 2000)
                    return
                }

                authSuccess(result.accessToken, result.refreshToken)
                toast.success("Signed in successfully!")
                setTimeout(() => {
                    navigate({ to: "/dashboard" })
                }, 1000)
            } catch (error) {
                setStatus("error")
                console.error("OAuth callback error:", error)
                toast.error("An unexpected error occurred")
                setTimeout(() => navigate({ to: "/auth" }), 2000)
            }
        }

        handleCallback()
    }, [navigate, authSuccess])

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="text-center">
                {status === "processing" && (
                    <>
                        <Spinner className="h-8 w-8 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Completing sign in...</h2>
                        <p className="text-gray-600">Please wait while we authenticate you.</p>
                    </>
                )}
                {status === "success" && (
                    <>
                        <div className="text-green-500 text-6xl mb-4">✓</div>
                        <h2 className="text-xl font-semibold mb-2">Success!</h2>
                        <p className="text-gray-600">Redirecting to dashboard...</p>
                    </>
                )}
                {status === "error" && (
                    <>
                        <div className="text-red-500 text-6xl mb-4">✗</div>
                        <h2 className="text-xl font-semibold mb-2">Authentication Failed</h2>
                        <p className="text-gray-600">Redirecting back to login...</p>
                    </>
                )}
            </div>
        </div>
    )
}

export const Route = createFileRoute("/oauth-callback")({
    component: AuthCallback,
})
