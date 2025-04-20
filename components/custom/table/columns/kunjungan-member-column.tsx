"use client"

import { ColumnDef } from "@tanstack/react-table";
import { TKunjunganMember } from "@/data/kunjungan-member-dummy-data";

export const kunjunganMembersColumn: ColumnDef<TKunjunganMember>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "memberId",
        header: "Member ID",
    },
    {
        accessorKey: "tanggal",
        header: "Tanggal Kunjungan",
        cell: ({ row }) => {
            const date = new Date(row.getValue("tanggal"));
            return date.toLocaleDateString("id-ID");
        },
    },
];
