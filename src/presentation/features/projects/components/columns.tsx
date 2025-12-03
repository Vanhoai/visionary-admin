import { type ColumnDef } from "@tanstack/react-table"

import { Checkbox, GithubIcon } from "@/presentation/components"
import { BadgeIndexed, DataTableColumnHeader } from "@/presentation/components"

import { type Project } from "../data/schema"
import { ProjectRowActions } from "./project_row_actions"

export const projectsColumns: ColumnDef<Project>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-0.5"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-0.5"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Project" />,
        cell: ({ row }) => <div className="w-20">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "description",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => {
            const description = row.getValue("description") as string
            return (
                <div className="max-w-[500px] truncate font-medium" title={description}>
                    {description}
                </div>
            )
        },
    },
    {
        accessorKey: "github",
        header: ({ column }) => <DataTableColumnHeader column={column} title="GitHub" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => {
            const github = row.getValue("github") as string
            return (
                <a href={github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    <GithubIcon />
                </a>
            )
        },
    },
    {
        accessorKey: "tags",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tags" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => {
            const tags = row.getValue("tags") as string[]
            return (
                <div className="flex flex-row gap-1">
                    {tags.map((tag, index) => (
                        <BadgeIndexed key={tag} index={index} text={tag} />
                    ))}
                </div>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => {
            const createdAt = row.getValue("createdAt") as number
            const date = new Date(createdAt)
            return <div>{date.toISOString()}</div>
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Updated At" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => {
            const updatedAt = row.getValue("updatedAt") as number
            const date = new Date(updatedAt)
            return <div>{date.toISOString()}</div>
        },
    },
    {
        id: "actions",
        cell: () => <ProjectRowActions />,
    },
]
