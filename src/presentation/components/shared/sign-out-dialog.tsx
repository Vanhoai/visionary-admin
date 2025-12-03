import { useNavigate, useLocation } from "@tanstack/react-router"
import { ConfirmDialog } from "@/presentation/components"
import { useAuthStore } from "@/presentation/store"
import { authService } from "@/presentation/di"

interface SignOutDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const { resetAuth } = useAuthStore()

    const handleSignOut = async () => {
        await authService.signOut()

        resetAuth()
        const currentPath = location.href
        navigate({
            to: "/auth",
            search: { redirect: currentPath },
            replace: true,
        })
    }

    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Sign out"
            desc="Are you sure you want to sign out? You will need to sign in again to access your account."
            confirmText="Sign out"
            destructive
            handleConfirm={handleSignOut}
            className="sm:max-w-sm"
        />
    )
}
