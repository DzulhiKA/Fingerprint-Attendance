"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TKunjunganMember } from "@/data/kunjungan-member-dummy-data";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const kunjunganMembersColumn: ColumnDef<TKunjunganMember>[] = [
  {
    accessorKey: "pin",
    header: "PIN",
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "scan_date",
    header: "Tanggal Kunjungan",
    cell: ({ row }) => {
      const date = new Date(row.getValue("scan_date"));
      return format(date, "EEEE, dd LLLL y, kk:mm", { locale: id });
    },
  },
];
