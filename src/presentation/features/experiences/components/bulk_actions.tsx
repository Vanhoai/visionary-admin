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
import type { Experience } from "../data/schema"

interface ExperiencesBulkActionsProps<T> {
    table: Table<T>
}

export function ExperiencesBulkActions<T>({ table }: ExperiencesBulkActionsProps<T>) {
    const selectedRows = table.getFilteredSelectedRowModel().rows

    const exportToCSV = () => {
        const selectedTasks = selectedRows.map((row) => row.original as Experience)
        toast.promise(sleep(2000), {
            loading: "Exporting Tasks...",
            success: () => {
                table.resetRowSelection()
                return `Exported ${selectedTasks.length} Experience${selectedTasks.length > 1 ? "s" : ""} to CSV.`
            },
            error: "Error",
        })

        table.resetRowSelection()
    }

    return (
        <BulkActionsToolbar table={table} entityName="experience">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={exportToCSV}
                        className="size-8"
                        aria-label="Export tasks"
                        title="Export tasks"
                    >
                        <DownloadIcon />
                        <span className="sr-only">Export Experience</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Export Experience</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {}}
                        className="size-8"
                        aria-label="Delete Selected Experiences"
                        title="Delete Selected Experiences"
                    >
                        <ArchiveIcon />
                        <span className="sr-only">Delete Selected Experiences</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete Selected Experiences</p>
                </TooltipContent>
            </Tooltip>
        </BulkActionsToolbar>
    )
}
