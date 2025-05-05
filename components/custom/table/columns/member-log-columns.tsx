"use client";

import { TMemberLog } from "@/data/member-log-dummy-data";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const memberLogColumns: ColumnDef<TMemberLog>[] = [
  { accessorKey: "pin", header: "PIN" },
  { accessorKey: "nama", header: "Nama" },
  { accessorKey: "action", header: "Action" },
  {
    accessorKey: "old_expired",
    header: "Expired Lama",
    cell: ({ row }) => {
      const date = new Date(row.getValue("old_expired"));
      return row.getValue("action") === "new"
        ? ""
        : format(date, "dd LLLL y", { locale: id });
    },
  },
  {
    accessorKey: "new_expired",
    header: "Expired Baru",
    cell: ({ row }) => {
      const date = new Date(row.getValue("new_expired"));
      return format(date, "dd LLLL y", { locale: id });
    },
  },
];
