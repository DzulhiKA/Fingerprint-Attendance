"use client";

import { ColumnDef } from "@tanstack/react-table";
import { THarga } from "@/data/harga-dummy-data";
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

export const hargaColumns: ColumnDef<THarga>[] = [
  { accessorKey: "nama", header: "Nama" },
  {
    accessorKey: "harga",
    header: "Harga",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("harga"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);

      return formatted;
    },
  },
  { accessorKey: "keterangan", header: "Keterangan" },
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
                <Link href={`/dashboard/paket/edit/${id}`}>Edit</Link>
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
                      fetch(`/api/db/paket/${id}`, {
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
