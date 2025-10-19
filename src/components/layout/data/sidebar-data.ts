import {
    LayoutDashboard,
    Monitor,
    ListTodo,
    Bell,
    Palette,
    Wrench,
    UserCog,
    Users,
    AudioWaveform,
    GalleryVerticalEnd,
    DatabaseZap,
} from "lucide-react"
import { type SidebarData } from "../types"

export const sidebarData: SidebarData = {
    user: {
        name: "satnaing",
        email: "satnaingdev@gmail.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Visonary Ltd",
            logo: DatabaseZap,
            plan: "Professional",
        },
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
    ],
    navGroups: [
        {
            title: "General",
            items: [
                {
                    title: "Dashboard",
                    url: "/",
                    icon: LayoutDashboard,
                },
                {
                    title: "Blogs",
                    url: "/blogs",
                    icon: ListTodo,
                },
                // {
                //     title: "Users",
                //     url: "/users",
                //     icon: Users,
                // },
            ],
        },
        // {
        //     title: "Pages",
        //     items: [
        //         {
        //             title: "Auth",
        //             icon: ShieldCheck,
        //             items: [
        //                 {
        //                     title: "Sign In",
        //                     url: "/sign-in",
        //                 },
        //                 {
        //                     title: "Sign In (2 Col)",
        //                     url: "/sign-in-2",
        //                 },
        //                 {
        //                     title: "Sign Up",
        //                     url: "/sign-up",
        //                 },
        //                 {
        //                     title: "Forgot Password",
        //                     url: "/forgot-password",
        //                 },
        //                 {
        //                     title: "OTP",
        //                     url: "/otp",
        //                 },
        //             ],
        //         },
        //         {
        //             title: "Errors",
        //             icon: Bug,
        //             items: [
        //                 {
        //                     title: "Unauthorized",
        //                     url: "/errors/unauthorized",
        //                     icon: Lock,
        //                 },
        //                 {
        //                     title: "Forbidden",
        //                     url: "/errors/forbidden",
        //                     icon: UserX,
        //                 },
        //                 {
        //                     title: "Not Found",
        //                     url: "/errors/not-found",
        //                     icon: FileX,
        //                 },
        //                 {
        //                     title: "Internal Server Error",
        //                     url: "/errors/internal-server-error",
        //                     icon: ServerOff,
        //                 },
        //                 {
        //                     title: "Maintenance Error",
        //                     url: "/errors/maintenance-error",
        //                     icon: Construction,
        //                 },
        //             ],
        //         },
        //     ],
        // },
        {
            title: "Settings",
            items: [
                {
                    title: "Appearance",
                    url: "/settings/appearance",
                    icon: Palette,
                },
                {
                    title: "Notifications",
                    url: "/settings/notifications",
                    icon: Bell,
                },
                {
                    title: "Display",
                    url: "/settings/display",
                    icon: Monitor,
                },
            ],
        },
    ],
}
