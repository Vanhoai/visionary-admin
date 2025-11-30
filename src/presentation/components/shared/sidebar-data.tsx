import { type SidebarData } from "./types"
import { HugeiconsIcon } from "@hugeicons/react"
import { GridViewIcon, CommandIcon, DocumentCodeIcon } from "@hugeicons/core-free-icons"

export const sidebarData: SidebarData = {
    user: {
        name: "Hinsun",
        email: "hinsun.studio@gmail.com",
        avatar: "/avatar.png",
    },
    teams: [
        {
            name: "Visionary Admin",
            logo: <HugeiconsIcon icon={CommandIcon} />,
            plan: "Startup",
        },
        {
            name: "Hinsun LLC",
            logo: <HugeiconsIcon icon={CommandIcon} />,
            plan: "Enterprise",
        },
    ],
    navGroups: [
        {
            title: "General",
            items: [
                {
                    title: "Dashboard",
                    url: "/dashboard",
                    icon: <HugeiconsIcon icon={GridViewIcon} />,
                },
                {
                    title: "Blogs",
                    url: "/blogs",
                    icon: <HugeiconsIcon icon={DocumentCodeIcon} />,
                },
            ],
        },
    ],
}
