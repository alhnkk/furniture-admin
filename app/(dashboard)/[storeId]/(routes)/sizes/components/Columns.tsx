"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;    
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "İsim",
  },
  {
    accessorKey: "value",
    header: "Beden",
    cell: ({ row }) => row.original.value,
  },
  {
    accessorKey: "createdAt", 
    header: "Tarih",
  },
  {
    id: "actions",
    header: "İşlemler",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
