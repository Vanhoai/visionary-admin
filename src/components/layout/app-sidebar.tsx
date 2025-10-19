import { useLayout } from "@/context/layout-provider"
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { sidebarData } from "./data/sidebar-data"
import { NavGroup } from "./nav-group"
import { TeamSwitcher } from "./team-switcher"

export function AppSidebar() {
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
            {/*<SidebarFooter>
                <NavUser user={sidebarData.user} />
            </SidebarFooter>*/}
            <SidebarRail />
        </Sidebar>
    )
}
