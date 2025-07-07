"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";
import Image from "next/image";

export type BillboardColumn = {
  id: string;
  label: string;
  imageUrl: string | null;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "İsim",
  },
  {
    accessorKey: "imageUrl",
    header: "Görsel",
    cell: ({ row }) =>
      row.original.imageUrl ? (
        <Image
          src={row.original.imageUrl}
          alt={row.original.label}
          width={50}
          height={50}
        />
      ) : (
        <div className="text-sm text-gray-500">Görsel yok</div>
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
