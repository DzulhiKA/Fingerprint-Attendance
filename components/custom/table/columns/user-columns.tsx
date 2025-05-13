"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TUser } from "@/data/user-dummy-data";
import { format } from "date-fns";
import { id } from "date-fns/locale";
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

export const userColumns: ColumnDef<TUser>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "nama", header: "Nama" },
  {
    accessorKey: "createdAt",
    header: "Tanggal Dibuat",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return format(date, "dd LLLL y", { locale: id });
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
                <Link href={`/dashboard/user/edit/${id}`}>Edit</Link>
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
                      fetch(`/api/db/staff/${id}`, {
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
