"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { TMember } from "@/data/member-dummy-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const memberColumn: ColumnDef<TMember>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
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
    header: "Tanggal Kedaluwarsa",
    cell: ({ row }) => {
      const expiredAt = new Date(row.getValue("expiredAt"));
      const now = new Date();

      const timeDiff = expiredAt.getTime() - now.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      const isNearExpiry = daysLeft <= 3;
      const isExpired = daysLeft < 0;

      const textColor =
        isExpired || isNearExpiry ? "text-red-500" : "text-foreground";
      const badgeColor = isExpired
        ? "bg-red-500 text-white"
        : isNearExpiry
        ? "bg-yellow-500 text-black"
        : "bg-muted text-muted-foreground";

      return (
        <div className="flex flex-col gap-1">
          {/* Tanggal */}
          <span className={`text-sm font-medium ${textColor}`}>
            {format(expiredAt, "EEEE, dd LLLL y", { locale: id })}
          </span>

          {/* Badge */}
          <Badge className={`w-fit ${badgeColor}`}>
            {isExpired ? "Sudah kedaluwarsa" : `Sisa ${daysLeft} hari`}
          </Badge>

          {/* Tombol Aksi */}
          <div className="flex gap-2 mt-1">
            <Button size="sm" variant="outline">
              Perpanjang
            </Button>
            {isExpired && (
              <Button size="sm" variant="destructive">
                Hapus Member
              </Button>
            )}
          </div>
        </div>
      );
    },
  },
];
