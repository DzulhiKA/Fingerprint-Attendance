"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { TMember } from "@/data/member-dummy-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

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
      const showExtendBtn = isNearExpiry || isExpired;

      const textColor =
        isExpired || isNearExpiry ? "text-red-500" : "text-foreground";
      const badgeColor = isExpired
        ? "bg-red-500 text-white"
        : isNearExpiry
        ? "bg-yellow-500 text-black"
        : "bg-muted text-muted-foreground";

      const pin = row.getValue("pin");
      const sn = "66208024520233";

      // inDevice dari row.original
      const inDevice = row.original?.inDevice;
      const nama = row.original?.nama;
      const pwd = row.original?.pwd;
      const rfid = row.original?.rfid;
      const priv = row.original?.priv;
      const tmp = row.original?.tmp;

      // ⬇️ Tambahkan state untuk datepicker
      const [date, setDate] = useState<Date | undefined>();
      const [open, setOpen] = useState(false);

      const handleExtendDate = async (selectedDate: Date) => {
        try {
          setOpen(false);
          await toast.promise(
            fetch(`/api/db/user/${pin}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                expiredAt: selectedDate,
                oldExpired: expiredAt,
              }),
            }).then(async (res) => {
              if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.message || "Gagal memperpanjang.");
              }
              location.reload();
              return res.json();
            }),
            {
              loading: "Memperpanjang...",
              success: "Tanggal berhasil diperpanjang!",
              error: "Gagal memperpanjang.",
            }
          );
        } catch (err) {
          console.error(err);
        }
      };

      return (
        <div className="flex flex-col gap-1">
          <span className={`text-sm font-medium ${textColor}`}>
            {format(expiredAt, "EEEE, dd LLLL y", { locale: id })}
          </span>

          <Badge className={`w-fit ${badgeColor}`}>
            {isExpired ? "Sudah kedaluwarsa" : `Sisa ${daysLeft} hari`}
          </Badge>

          <div className="flex gap-2 mt-1">
            {showExtendBtn && (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="outline">
                    Perpanjang
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => d && handleExtendDate(d)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}

            {/* Tombol berdasarkan status inDevice */}
            {inDevice ? (
              isExpired && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      Hapus Member
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Yakin ingin menghapus member ini?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Aksi ini tidak bisa dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          try {
                            await toast.promise(
                              fetch("/api/device/delete_user", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ sn, pin }),
                              }).then(async (res) => {
                                if (!res.ok) {
                                  const data = await res
                                    .json()
                                    .catch(() => ({}));
                                  throw new Error(
                                    data?.message || "Terjadi kesalahan."
                                  );
                                }
                                if (res.ok) location.reload();
                                return res.json();
                              }),
                              {
                                loading: "Menghapus member...",
                                success: "Member berhasil dihapus!",
                                error: "Gagal menghapus member.",
                              }
                            );
                          } catch (error) {
                            // Error sudah ditangani toast
                          }
                        }}
                      >
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="default">
                    Upload Member
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Upload Member ke Perangkat?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Member <strong>{nama}</strong> akan dikirim ke perangkat
                      dengan SN: <strong>{sn}</strong>.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        try {
                          await toast.promise(
                            fetch("/api/device/upload_user", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                pin,
                                sn,
                                nama,
                                pwd,
                                rfid,
                                priv,
                                tmp,
                              }),
                            }).then(async (res) => {
                              if (!res.ok) {
                                const data = await res.json().catch(() => ({}));
                                throw new Error(
                                  data?.message || "Gagal upload."
                                );
                              }
                              if (res.ok) location.reload();
                              return res.json();
                            }),
                            {
                              loading: "Mengunggah member...",
                              success: "Member berhasil diunggah!",
                              error: "Gagal mengunggah member.",
                            }
                          );
                        } catch (err) {
                          // Error sudah ditangani oleh toast
                        }
                      }}
                    >
                      Upload
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      );
    },
  },
];
