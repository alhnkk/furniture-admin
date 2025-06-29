"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;  
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "İsim",
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
