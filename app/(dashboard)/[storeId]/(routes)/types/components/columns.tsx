"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
export type TypeColumn = {
    id: string
    name: string
    categoryLabel: string
    createdAt: string;
}

export const columns: ColumnDef<TypeColumn>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "category",
        header: "Categoría",
        cell: ({ row }) => row.original.categoryLabel,
    },
    {
        accessorKey: "createdAt",
        header: "Fecha",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
]
