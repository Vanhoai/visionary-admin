import { Button } from "@/presentation/components"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/auth")({
    component: SignInPage,
})

function SignInPage() {
    const signIn = async () => {}

    return (
        <div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}
