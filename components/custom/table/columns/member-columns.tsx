"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TMember } from '@/data/member-dummy-data';

export const memberColumns: ColumnDef<TMember>[] = [
    { accessorKey: "nama", header: "Nama" },
    { accessorKey: "alamat", header: "Alamat" },
    { accessorKey: "no_hp", header: "No. Hp" },
    {
        accessorKey: "tgl_daftar",
        header: "Tanggal Daftar",
        cell: ({ row }) => {
            const date = new Date(row.getValue("tgl_daftar"));
            return date.toLocaleDateString('id-ID');
        }
    },
    {
        accessorKey: "periode_mulai",
        header: "Periode Mulai",
        cell: ({ row }) => {
            const date = new Date(row.getValue("periode_mulai"));
            return date.toLocaleDateString('id-ID');
        }
    },
    {
        accessorKey: "periode_berakhir",
        header: "Periode Berakhir",
        cell: ({ row }) => {
            const date = new Date(row.getValue("periode_berakhir"));
            return date.toLocaleDateString('id-ID');
        }
    },
    { accessorKey: "tipe_member", header: "Tipe Member" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return <div className="capitalize">{row.getValue("status")}</div>
        }
     },
];
