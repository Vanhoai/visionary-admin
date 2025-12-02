import * as React from "react"
import { useLayout } from "@/presentation/contexts"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "../ui"
import { sidebarData } from "./sidebar-data"
import { NavGroup } from "./nav-group"
import { TeamSwitcher } from "./team-switcher"
import { NavUser } from "./nav-user"

export const AppSideBar: React.FC = () => {
    const { collapsible, variant } = useLayout()

    return (
        <Sidebar collapsible={collapsible} variant={variant}>
            <SidebarHeader>
                <TeamSwitcher teams={sidebarData.teams} />
            </SidebarHeader>
            <SidebarContent>
                {sidebarData.navGroups.map((props) => (
                    <NavGroup key={props.title} {...props} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={sidebarData.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
