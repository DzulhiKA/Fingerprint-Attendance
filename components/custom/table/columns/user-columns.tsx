"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TUser } from "@/data/user-dummy-data";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const userColumns: ColumnDef<TUser>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "nama", header: "Nama" },
  {
    accessorKey: "createdAt",
    header: "Tanggal Dibuat",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return format(date, "dd LLLL y", { locale: id });
    },
  },
];
