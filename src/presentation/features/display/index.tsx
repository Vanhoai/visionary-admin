import * as React from "react"

import { Header, ProfileDropdown, Search, ThemeSwitch } from "@/presentation/components"

export const DisplayFeature: React.FC = () => {
    return (
        <React.Fragment>
            <Header fixed>
                <Search />
                <div className="ms-auto flex items-center space-x-4">
                    <ThemeSwitch />
                    <ProfileDropdown />
                </div>
            </Header>
        </React.Fragment>
    )
}
