import { type SidebarData } from "./types"
import {
    DashboardIcon,
    ReaderIcon,
    ArchiveIcon,
    CardStackMinusIcon,
    PersonIcon,
    CubeIcon,
    DesktopIcon,
    Half2Icon,
    CopyIcon,
} from "@radix-ui/react-icons"

export const sidebarData: SidebarData = {
    user: {
        name: "Hinsun",
        email: "hinsun.studio@gmail.com",
        avatar: "/avatar.png",
    },
    teams: [
        {
            name: "Visionary Admin",
            logo: <ArchiveIcon />,
            plan: "Hinsun",
        },
        {
            name: "Hinsun LLC",
            logo: <ArchiveIcon />,
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
                    icon: <DashboardIcon />,
                },
                {
                    title: "Accounts",
                    url: "/accounts",
                    icon: <PersonIcon />,
                },
                {
                    title: "Blogs",
                    url: "/blogs",
                    icon: <ReaderIcon />,
                },
                {
                    title: "Experiences",
                    url: "/experiences",
                    icon: <CardStackMinusIcon />,
                },
                {
                    title: "Projects",
                    url: "/projects",
                    icon: <CubeIcon />,
                },
            ],
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Appearance",
                    url: "/settings/appearance",
                    icon: <Half2Icon />,
                },
                {
                    title: "Notifications",
                    url: "/settings/notifications",
                    icon: <CopyIcon />,
                },
                {
                    title: "Display",
                    url: "/settings/display",
                    icon: <DesktopIcon />,
                },
            ],
        },
    ],
}
