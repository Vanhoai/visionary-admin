import * as React from "react"
import {
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { getRouteApi } from "@tanstack/react-router"

import { cn } from "@/presentation/lib"
import { useTableUrlState } from "@/presentation/hooks"
import {
    DataTablePagination,
    DataTableToolbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/presentation/components"

import { type Experience } from "../data/schema"
import { experiencesColumns as columns } from "./columns"
import { technologies } from "../data/data"
import { ExperiencesBulkActions } from "./bulk_actions"

const route = getRouteApi("/_authenticated/experiences/")

interface ExperiencesTableProps {
    data: Experience[]
}

export const ExperiencesTable: React.FC<ExperiencesTableProps> = ({ data }) => {
    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

    // Synced with URL states (updated to match route search schema defaults)
    const {
        globalFilter,
        onGlobalFilterChange,
        columnFilters,
        onColumnFiltersChange,
        pagination,
        onPaginationChange,
        ensurePageInRange,
    } = useTableUrlState({
        search: route.useSearch(),
        navigate: route.useNavigate(),
        pagination: { defaultPage: 1, defaultPageSize: 10 },
        globalFilter: { enabled: true, key: "filter" },
        columnFilters: [{ columnId: "technologies", searchKey: "technologies", type: "array" }],
    })

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            globalFilter,
            pagination,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        globalFilterFn: (row, _columnId, filterValue) => {
            const id = String(row.getValue("id")).toLowerCase()
            const company = String(row.getValue("company")).toLowerCase()
            const position = String(row.getValue("position")).toLowerCase()

            const searchValue = String(filterValue).toLowerCase()
            return id.includes(searchValue) || company.includes(searchValue) || position.includes(searchValue)
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onPaginationChange,
        onGlobalFilterChange,
        onColumnFiltersChange,
    })

    const pageCount = table.getPageCount()
    React.useEffect(() => {
        ensurePageInRange(pageCount)
    }, [pageCount, ensurePageInRange])

    return (
        <div className={cn('max-sm:has-[div[role="toolbar"]]:mb-16', "flex flex-1 flex-col gap-4")}>
            <DataTableToolbar
                table={table}
                searchPlaceholder="Search by position and company"
                filters={[
                    {
                        columnId: "technologies",
                        title: "Technologies",
                        options: technologies,
                    },
                ]}
            />
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className={cn(
                                                header.column.columnDef.meta?.className,
                                                header.column.columnDef.meta?.thClassName,
                                            )}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn(
                                                cell.column.columnDef.meta?.className,
                                                cell.column.columnDef.meta?.tdClassName,
                                            )}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} className="mt-auto" />
            <ExperiencesBulkActions table={table} />
        </div>
    )
}
