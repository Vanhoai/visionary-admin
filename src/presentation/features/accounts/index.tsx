import * as React from "react"
import { getRouteApi } from "@tanstack/react-router"

import { Header, Main, ProfileDropdown, Search, ThemeSwitch } from "@/presentation/components"

import { users } from "./data/accounts"
import { AccountsTable } from "./components/table"
import { UsersDialogs } from "./components/users-dialogs"
import { UsersProvider } from "./components/users-provider"
import { AccountsPrimaryButtons } from "./components/primary_buttons"

const route = getRouteApi("/_authenticated/accounts/")

export const AccountsFeature: React.FC = () => {
    const search = route.useSearch()
    const navigate = route.useNavigate()

    return (
        <UsersProvider>
            <Header fixed>
                <Search />
                <div className="ms-auto flex items-center space-x-4">
                    <ThemeSwitch />
                    <ProfileDropdown />
                </div>
            </Header>

            <Main className="flex flex-1 flex-col gap-4 sm:gap-6">
                <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Accounts</h2>
                        <p className="text-muted-foreground">
                            Manage your application's accounts and their permissions.
                        </p>
                    </div>

                    <AccountsPrimaryButtons />
                </div>
                <AccountsTable data={users} search={search} navigate={navigate} />
            </Main>

            <UsersDialogs />
        </UsersProvider>
    )
}
