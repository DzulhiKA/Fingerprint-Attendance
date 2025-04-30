"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { TMember } from "@/data/member-dummy-data";

export const memberColumn: ColumnDef<TMember>[] = [
  {
    accessorKey: "pin",
    header: "PIN",
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "expiredAt",
    header: "Tanggal Kalauarsa",
    cell: ({ row }) => {
      const date = new Date(row.getValue("expiredAt"));
      return format(date, "EEEE, dd LLLL y, kk:mm", { locale: id });
    },
  },
];
