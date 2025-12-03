import { useState } from "react"
import { type Table } from "@tanstack/react-table"
import { ArchiveIcon } from "@radix-ui/react-icons"

import {
    Button,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    DataTableBulkActions as BulkActionsToolbar,
} from "@/presentation/components"

import { UsersMultiDeleteDialog } from "./users-multi-delete-dialog"

type AccountsBulkActionsProps<T> = {
    table: Table<T>
}

export function AccountsBulkActions<T>({ table }: AccountsBulkActionsProps<T>) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    return (
        <>
            <BulkActionsToolbar table={table} entityName="account">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => setShowDeleteConfirm(true)}
                            className="size-8"
                            aria-label="Delete selected users"
                            title="Delete selected users"
                        >
                            <ArchiveIcon />
                            <span className="sr-only">Delete Selected Accounts</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Delete Selected Accounts</p>
                    </TooltipContent>
                </Tooltip>
            </BulkActionsToolbar>

            <UsersMultiDeleteDialog table={table} open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm} />
        </>
    )
}
