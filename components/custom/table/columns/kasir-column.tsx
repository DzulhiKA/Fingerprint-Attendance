"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { TKasir } from "@/data/kasir-dummy-data";

export const kasirColumn: ColumnDef<TKasir>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "quantity",
    header: "Kuantitas",
  },
  {
    accessorKey: "total",
    header: "Total Bayar",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);
    },
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Transaksi",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return format(date, "EEEE, dd LLLL y, kk:mm", { locale: id });
    },
  },
];
