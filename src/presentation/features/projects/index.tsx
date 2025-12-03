import * as React from "react"

import { Header, Main, ProfileDropdown, Search, ThemeSwitch } from "@/presentation/components"

import { projects } from "./data/projects"
import { ProjectsTable } from "./components/table"
import { ProjectsPrimaryButtons } from "./components/primary_buttons"

export const ProjectsFeature: React.FC = () => {
    return (
        <React.Fragment>
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
                        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
                        <p className="text-muted-foreground">Manage and showcase your projects here.</p>
                    </div>
                    <ProjectsPrimaryButtons />
                </div>

                <ProjectsTable data={projects} />
            </Main>
        </React.Fragment>
    )
}
