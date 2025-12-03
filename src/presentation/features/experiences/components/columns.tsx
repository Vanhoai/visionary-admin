import { type ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/presentation/components"
import { BadgeIndexed, DataTableColumnHeader } from "@/presentation/components"

import { type Experience } from "../data/schema"
import { ExperienceRowActions } from "./row_actions"

export const experiencesColumns: ColumnDef<Experience>[] = [
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
        header: ({ column }) => <DataTableColumnHeader column={column} title="Experience" />,
        cell: ({ row }) => <div className="w-20">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "company",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Company" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => <div className="font-medium">{row.getValue("company")}</div>,
    },
    {
        accessorKey: "position",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Position" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => <div className="font-medium">{row.getValue("position")}</div>,
    },
    {
        accessorKey: "location",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => <div className="font-medium">{row.getValue("location")}</div>,
    },
    {
        accessorKey: "technologies",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Technologies" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => {
            const technologies = row.getValue("technologies") as string[]
            return (
                <div className="flex flex-row gap-1">
                    {technologies.map((tech, index) => (
                        <BadgeIndexed key={tech} index={index} text={tech} />
                    ))}
                </div>
            )
        },
    },
    {
        accessorKey: "startDate",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Start Date" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => {
            const startDate = row.getValue("startDate") as number
            const date = new Date(startDate)
            return <div>{date.toISOString()}</div>
        },
    },
    {
        accessorKey: "endDate",
        header: ({ column }) => <DataTableColumnHeader column={column} title="End Date" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => {
            const endDate = row.getValue("endDate") as number | null
            if (endDate === null) return <div>None</div>

            const date = new Date(endDate)
            return <div>{date.toISOString()}</div>
        },
    },
    {
        id: "actions",
        cell: () => <ExperienceRowActions />,
    },
]
