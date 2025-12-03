import { toast } from "sonner"
import { type Table } from "@tanstack/react-table"
import { ArchiveIcon, DownloadIcon } from "@radix-ui/react-icons"

import {
    Button,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    DataTableBulkActions as BulkActionsToolbar,
} from "@/presentation/components"
import { sleep } from "@/presentation/lib"
import type { Project } from "../data/schema"

interface ProjectsBulkActionsProps<T> {
    table: Table<T>
}

export function ProjectsBulkActions<T>({ table }: ProjectsBulkActionsProps<T>) {
    const selectedRows = table.getFilteredSelectedRowModel().rows

    const exportToCSV = () => {
        const selectedProjects = selectedRows.map((row) => row.original as Project)
        toast.promise(sleep(2000), {
            loading: "Exporting Projects...",
            success: () => {
                table.resetRowSelection()
                return `Exported ${selectedProjects.length} Project${selectedProjects.length > 1 ? "s" : ""} to CSV.`
            },
            error: "Error",
        })

        table.resetRowSelection()
    }

    return (
        <BulkActionsToolbar table={table} entityName="project">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={exportToCSV}
                        className="size-8"
                        aria-label="Export projects"
                        title="Export projects"
                    >
                        <DownloadIcon />
                        <span className="sr-only">Export Project</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Export Project</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {}}
                        className="size-8"
                        aria-label="Delete Selected Projects"
                        title="Delete Selected Projects"
                    >
                        <ArchiveIcon />
                        <span className="sr-only">Delete Selected Projects</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete Selected Projects</p>
                </TooltipContent>
            </Tooltip>
        </BulkActionsToolbar>
    )
}
