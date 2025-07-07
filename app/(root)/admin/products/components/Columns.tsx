"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  description: string;
  category: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "İsim",
  },
  {
    accessorKey: "description",
    header: "Açıklama",
  },
  {
    accessorKey: "isArchived",
    header: "Arşiv",
  },
  {
    accessorKey: "isFeatured",
    header: "Öne Çıkar",
  },
  {
    accessorKey: "category",
    header: "Kategori",
  },
  {
    accessorKey: "createdAt",
    header: "Tarih",
  },
  {
    id: "actions",
    header: "İşlemler",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
