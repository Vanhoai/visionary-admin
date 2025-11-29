import * as React from "react"
import { toast } from "sonner"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

import { isFailure } from "@/core"
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    GithubIcon,
    GoogleIcon,
    Input,
    Label,
    Separator,
    Spinner,
} from "@/presentation/components"
import { useAuthStore } from "@/presentation/store"
import { accountService, authService } from "@/presentation/di"

const AuthMode = {
    BEGIN: "BEGIN",
    SIGN_IN: "SIGN_IN",
    SIGN_UP: "SIGN_UP",
} as const

type AuthMode = (typeof AuthMode)[keyof typeof AuthMode]

const SignInPage: React.FC = () => {
    const navigate = useNavigate()
    const { authSuccess } = useAuthStore()

    const [mode, setMode] = React.useState<AuthMode>(AuthMode.BEGIN)
    const [email, setEmail] = React.useState<string>("hinsun.studio@gmail.com")
    const [password, setPassword] = React.useState<string>("vanhoai.adv123")
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const labelButton = React.useMemo(() => {
        switch (mode) {
            case AuthMode.BEGIN:
                return "Continue"
            case AuthMode.SIGN_IN:
                return "Sign In"
            case AuthMode.SIGN_UP:
                return "Sign Up"
        }
    }, [mode])

    const checkEmailExists = async () => {
        setIsLoading(true)
        const emailExist = await accountService.findAccountWithEmail(email)
        if (isFailure(emailExist)) {
            setIsLoading(false)
            setMode(AuthMode.SIGN_UP)
            toast.info("Email not found, please enter password to sign up.")
            return
        }

        setMode(AuthMode.SIGN_IN)
        setIsLoading(false)
        toast.success("Found Account", {
            description: "Please enter password to sign in.",
        })
    }

    const signIn = async () => {
        setIsLoading(true)
        const signInResult = await authService.signInWithEmail({ email, password })
        if (isFailure(signInResult)) {
            setIsLoading(false)
            toast.error("Sign In Failed", {
                description: signInResult.message,
            })

            return
        }

        setIsLoading(false)
        authSuccess(signInResult.accessToken, signInResult.refreshToken)
        navigate({ to: "/dashboard" })
    }

    const signUp = async () => {
        setIsLoading(true)
        setIsLoading(false)
    }

    const submit = () => {
        switch (mode) {
            case AuthMode.BEGIN:
                checkEmailExists()
                break
            case AuthMode.SIGN_IN:
                signIn()
                break
            case AuthMode.SIGN_UP:
                signUp()
                break
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Welcome to Visionary</CardTitle>
                    <CardDescription>
                        Please
                        {mode === AuthMode.SIGN_IN
                            ? " sign in to your account"
                            : mode === AuthMode.SIGN_UP
                              ? " create an account"
                              : " enter your email to get started"}
                        .
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    className="h-11"
                                    id="email"
                                    type="email"
                                    placeholder="example@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={mode !== AuthMode.BEGIN}
                                />
                            </div>

                            {mode !== AuthMode.BEGIN && (
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input
                                        className="h-11"
                                        id="password"
                                        type="password"
                                        required
                                        disabled={isLoading}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full h-11 cursor-pointer" onClick={submit} disabled={isLoading}>
                        {isLoading && <Spinner />}
                        {labelButton}
                    </Button>

                    <Separator className="my-4" />

                    <Button variant="outline" className="w-full h-11 mb-3 cursor-pointer">
                        <GoogleIcon />
                        Login with Google
                    </Button>

                    <Button variant="outline" className="w-full h-11 p-0 cursor-pointer">
                        <GithubIcon />
                        Login with Github
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export const Route = createFileRoute("/auth")({
    component: SignInPage,
})
