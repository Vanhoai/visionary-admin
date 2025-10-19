import React from "react"
import { Outlet } from "@tanstack/react-router"
import { Monitor, Bell, Palette, Wrench, UserCog } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ConfigDrawer } from "@/components/config-drawer"
import { Header } from "@/components/layout/header"
import { Main } from "@/components/layout/main"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { Search } from "@/components/search"
import { ThemeSwitch } from "@/components/theme-switch"
import { SidebarNav } from "./components/sidebar-nav"

const sidebarNavItems = [
    {
        title: "Profile",
        href: "/settings",
        icon: <UserCog size={18} />,
    },
    {
        title: "Account",
        href: "/settings/account",
        icon: <Wrench size={18} />,
    },
    {
        title: "Appearance",
        href: "/settings/appearance",
        icon: <Palette size={18} />,
    },
    {
        title: "Notifications",
        href: "/settings/notifications",
        icon: <Bell size={18} />,
    },
    {
        title: "Display",
        href: "/settings/display",
        icon: <Monitor size={18} />,
    },
]

export function Settings() {
    return (
        <React.Fragment>
            <Header>
                <Search />
                <div className="ms-auto flex items-center space-x-4">
                    <ThemeSwitch />
                    <ConfigDrawer />
                    <ProfileDropdown />
                </div>
            </Header>

            <Main fixed>
                <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <div className="flex w-full overflow-y-hidden p-1">
                        <Outlet />
                    </div>
                </div>
            </Main>
        </React.Fragment>
    )
}
