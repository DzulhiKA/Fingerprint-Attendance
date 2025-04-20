"use client"

import { ColumnDef } from "@tanstack/react-table";
import { TNonMembers } from '@/data/non-member-dummy-data';

export const nonMembersColumn: ColumnDef<TNonMembers>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "tgl_Kunjungan",
    header: "Tanggal Kunjungan",
    cell: ({ row }) => {
      const date = new Date(row.getValue("tgl_Kunjungan"));
      return date.toLocaleDateString("id-ID");
    },
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
];
