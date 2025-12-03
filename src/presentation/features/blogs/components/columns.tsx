import { type ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/presentation/components/ui/checkbox"
import { BadgeIndexed, DataTableColumnHeader } from "@/presentation/components"

import { type Blog } from "../data/schema"
import { DataTableRowActions } from "./row_actions"

export const blogsColumns: ColumnDef<Blog>[] = [
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
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
        cell: ({ row }) => <div>{row.getValue("id")}</div>,
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
        accessorKey: "categories",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Categories" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => {
            const categories = row.getValue("categories") as string[]

            return (
                <div className="flex flex-row gap-1">
                    {categories.map((tech, index) => (
                        <BadgeIndexed key={tech} index={index} text={tech} />
                    ))}
                </div>
            )
        },
    },
    {
        accessorKey: "isPublished",
        header: ({ column }) => <DataTableColumnHeader column={column} title="IsPublished" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => <BadgeIndexed index={0} text={String(row.getValue("isPublished")).toLocaleUpperCase()} />,
    },
    {
        accessorKey: "stars",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Stars" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => <div>{row.getValue("stars")}</div>,
    },
    {
        accessorKey: "views",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Views" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => <div>{row.getValue("views")}</div>,
    },
    {
        accessorKey: "authorId",
        header: ({ column }) => <DataTableColumnHeader column={column} title="AuthorId" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => <div>{row.getValue("authorId")}</div>,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="CreatedAt" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => {
            const createdAt = row.getValue("createdAt") as number
            const date = new Date(createdAt)
            return <div>{date.toISOString()}</div>
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="UpdatedAt" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => {
            const updatedAt = row.getValue("updatedAt") as number
            const date = new Date(updatedAt)
            return <div>{date.toISOString()}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]

// id: z.string(),
// authorId: z.string(),
// name: z.string(),
// isPublished: z.boolean(),
// stars: z.number().int(),
// views: z.number().int(),
// estimatedReadTime: z.number().int(),
// categories: z.array(z.string()),
// description: z.string().optional(),
// markdown: z.string().optional(),
