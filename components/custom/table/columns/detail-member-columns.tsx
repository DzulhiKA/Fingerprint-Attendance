"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TDetailMember } from "@/data/detail-member-dummy-data";

export const detailMemberColumns: ColumnDef<TDetailMember>[] = [
  {
    accessorKey: "pin",
    header: "PIN",
    cell: ({ row }) => {
      const pin = row.original.tb_user_copy1.pin;

      return pin;
    },
  },
  {
    accessorKey: "user_id",
    header: "ID Member",
    cell: ({ row }) => {
      const userId = row.original.user_id;

      return userId;
    },
  },
  { accessorKey: "nama", header: "Nama" },
  { accessorKey: "alamat", header: "Alamat" },
  { accessorKey: "no_hp", header: "No HP" },
  {
    accessorKey: "paket",
    header: "Paket",
    cell: ({ row }) => {
      const paket = row.original.Paket ? row.original.Paket.nama : "Tidak ada";

      return paket;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      const router = useRouter();
      const [open, setOpen] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem asChild>
                <Link href={`/dashboard/detail-member/edit/${id}`}>Edit</Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault(); // ⛔ cegah close
                  setOpen(true); // ✅ buka dialog manual
                }}
              >
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                <AlertDialogDescription>
                  Data yang dihapus tidak bisa dikembalikan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await toast.promise(
                      fetch(`/api/db/detailuser/${id}`, {
                        method: "DELETE",
                      }).then(async (res) => {
                        if (!res.ok) {
                          const err = await res.json().catch(() => ({}));
                          throw new Error(
                            err.message || "Gagal menghapus data"
                          );
                        }
                        if (res.ok) {
                          location.reload();
                        }
                        return res.json();
                      }),
                      {
                        loading: "Menghapus data...",
                        success: () => {
                          router.refresh();
                          return "Data berhasil dihapus!";
                        },
                        error: (err) =>
                          err.message ||
                          "Terjadi kesalahan saat menghapus data",
                      }
                    );
                  }}
                >
                  Hapus
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
