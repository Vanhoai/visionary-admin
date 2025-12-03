import { type ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/presentation/components/ui/checkbox"
import { BadgeIndexed, DataTableColumnHeader, LongText } from "@/presentation/components"

import { AccountsRowActions } from "./row_actions"
import type { Account } from "../data/schema"

// id: z.string(),
// username: z.string(),
// avatar: z.url(),
// email: z.email(),
// emailVerified: z.boolean(),
// bio: z.string(),
// isActive: z.boolean(),
// role: accountRoleSchema,
// createdAt: z.number(),
// updatedAt: z.number(),

export const accountsColumns: ColumnDef<Account>[] = [
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
        accessorKey: "username",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => <div className="font-medium">{row.getValue("username")}</div>,
    },
    {
        accessorKey: "email",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => <div className="font-medium">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "bio",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Bio" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => <LongText>{row.getValue("bio")}</LongText>,
    },
    {
        accessorKey: "role",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
        meta: { className: "ps-1", tdClassName: "ps-4" },
        cell: ({ row }) => <BadgeIndexed index={3} text={row.getValue("role")} />,
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
        cell: () => <AccountsRowActions />,
    },
]
