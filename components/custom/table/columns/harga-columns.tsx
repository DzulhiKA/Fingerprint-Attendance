"use client";

import { ColumnDef } from "@tanstack/react-table";
import { THarga } from "@/data/harga-dummy-data";

export const hargaColumns: ColumnDef<THarga>[] = [
  { accessorKey: "nama", header: "Nama" },
  {
    accessorKey: "harga",
    header: "Harga",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("harga"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);

      return formatted;
    },
  },
  { accessorKey: "keterangan", header: "Keterangan" },
];
