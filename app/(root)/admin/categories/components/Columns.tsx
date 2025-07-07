"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string;
  name: string;
  image: string | null;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "İsim",
  },
  {
    accessorKey: "image",
    header: "Resim",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.image ? (
          <Image
            src={row.original.image}
            alt={row.original.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            No image
          </div>
        )}
      </div>
    ),
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
