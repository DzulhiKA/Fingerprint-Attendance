"use client"

import { ColumnDef } from "@tanstack/react-table";
import { TNonMembers } from '@/data/non-member-dummy-data';
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const nonMembersColumn: ColumnDef<TNonMembers>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "harga_dibayar",
    header: "Harga",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("harga_dibayar"));
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);
    },
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Kunjungan",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return format(date, "EEEE, dd LLLL y, kk:mm", { locale: id })
    },
  },
];
