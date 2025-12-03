import * as React from "react"

import { Header, Main, ProfileDropdown, Search, ThemeSwitch } from "@/presentation/components"
import { BlogsPrimaryButtons } from "./components/blogs-primary-buttons"

import { blogs } from "./data/blogs"
import { BlogsTable } from "./components/table"
import { TasksProvider } from "./components/tasks-provider"

export const BlogsFeature: React.FC = () => {
    return (
        <TasksProvider>
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
                        <h2 className="text-2xl font-bold tracking-tight">Blogs</h2>
                        <p className="text-muted-foreground">Manage your blogs and organize them into categories.</p>
                    </div>
                    <BlogsPrimaryButtons />
                </div>

                <BlogsTable data={blogs} />
            </Main>
        </TasksProvider>
    )
}
