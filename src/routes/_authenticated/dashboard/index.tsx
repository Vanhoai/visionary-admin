import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Header, ProfileDropdown, Search, ThemeSwitch, TopNav } from "@/presentation/components"

const topNav = [
    {
        title: "Overview",
        href: "dashboard/overview",
        isActive: true,
        disabled: false,
    },
    {
        title: "Customers",
        href: "dashboard/customers",
        isActive: false,
        disabled: true,
    },
    {
        title: "Products",
        href: "dashboard/products",
        isActive: false,
        disabled: true,
    },
    {
        title: "Settings",
        href: "dashboard/settings",
        isActive: false,
        disabled: true,
    },
]

const DashboardPage: React.FC = () => {
    return (
        <React.Fragment>
            <Header>
                <TopNav links={topNav} />
                <div className="ms-auto flex items-center space-x-4">
                    <Search />
                    <ThemeSwitch />
                    <ProfileDropdown />
                </div>
            </Header>
        </React.Fragment>
    )
}

export const Route = createFileRoute("/_authenticated/dashboard/")({
    component: DashboardPage,
})
