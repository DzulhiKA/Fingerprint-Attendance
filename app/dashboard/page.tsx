"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SpokeSpinner } from "@/components/ui/spinner";
import useSWR from "swr";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { parseISO, format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface UserMember {
  id: string;
  pin: string;
  nama: string;
  expiredAt: string;
}

interface Staff {
  id: string;
  nama: string;
  password: string;
  createdAt: string;
}

interface Paket {
  id: string;
  nama: string;
  harga: string;
  keterangan: string;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<{ from: Date; to?: Date } | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date?.from || !date?.to) {
      toast.error("Please select both a start and end date.");
      return;
    }

    const startDateFormatted = format(date.from, "dd-MM-yyyy");
    const endDateFormatted = format(date.to, "dd-MM-yyyy");

    const payload = {
      startDate: format(date.from, "yyyy-MM-dd"),
      endDate: format(date.to, "yyyy-MM-dd"),
    };

    const toastId = toast.loading("Exporting report...");

    try {
      const res = await fetch("/api/db/laporan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) throw new Error();

      const doc = new jsPDF();
      const dataObj = json.data;
      let yOffset = 10;

      Object.entries(dataObj).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          // Filter out 'id' and 'updatedAt' but keep 'total'
          const columns = Object.keys(value[0])
            .filter((col) => col !== "id" && col !== "updatedAt")
            .map((col) => ({ header: col, dataKey: col }));

          const rows = value.map((item) => {
            const formattedItem: Record<string, any> = {};

            Object.entries(item).forEach(([field, val]) => {
              if (field === "id" || field === "updatedAt") return; // Skip 'id' and 'updatedAt'

              // Format date fields
              if (
                typeof val === "string" &&
                (field.toLowerCase().includes("date") ||
                  field.toLowerCase().includes("at"))
              ) {
                try {
                  formattedItem[field] = format(
                    parseISO(val),
                    "dd MMMM yyyy HH:mm",
                    {
                      locale: id,
                    }
                  );
                } catch {
                  formattedItem[field] = val;
                }
              }

              // Format harga fields with Rp. prefix
              else if (
                field.toLowerCase().includes("harga") ||
                field.toLowerCase().includes("bayar")
              ) {
                formattedItem[field] = `Rp. ${Number(val).toLocaleString(
                  "id-ID"
                )}`;
              }

              // Format total fields with Rp. prefix
              else if (field.toLowerCase().includes("total")) {
                formattedItem[field] = `Rp. ${Number(val).toLocaleString(
                  "id-ID"
                )}`;
              }

              // Default
              else {
                formattedItem[field] = val;
              }
            });

            return formattedItem;
          });

          doc.text(`Tabel: ${key}`, 14, yOffset);
          autoTable(doc, {
            startY: yOffset + 5,
            columns,
            body: rows,
            theme: "striped",
            styles: { fontSize: 10 },
            headStyles: { fillColor: [22, 160, 133] },
          });
          //@ts-ignore
          yOffset = doc.lastAutoTable.finalY + 10;
        }
      });

      // Generate PDF with custom filename based on date range
      const filename = `laporan_${startDateFormatted}_to_${endDateFormatted}.pdf`;
      doc.save(filename);

      toast.success("Report exported successfully", { id: toastId });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to export report", { id: toastId });
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Berhasil logout");
        router.push("/login");
      } else {
        toast.error("Gagal logout");
      }
    } catch {
      toast.error("Terjadi kesalahan");
    }
  };

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => res);

  const fetcherData = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => res.data);

  const { data: userMember, error: userMemberError } = useSWR<
    UserMember[],
    Error
  >("/api/db/user", fetcher);

  const { data: staff, error: staffError } = useSWR<Staff[], Error>(
    "/api/db/staff",
    fetcher
  );

  const { data: paket, error: paketError } = useSWR<Paket[], Error>(
    "/api/db/paket",
    fetcherData
  );

  // console.log(userMember, staff, paket)

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-sm ">
            {format(new Date(), "EEEE, dd MMMM yyyy", { locale: id })}
          </span>
          <Button
            variant="destructive"
            className="cursor-pointer"
            size="sm"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </header>

      {userMember && paket && staff ? (
        <div className="p-4">
          {/* Export Button */}
          <div className="mb-4">
            <Button onClick={() => setOpen(true)}>Export Laporan</Button>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Select Date Range</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        //@ts-ignore
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <DialogFooter>
                  <Button type="submit">Submit</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{staff?.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Paket</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{paket.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Member</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{userMember.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Member Expired</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {
                    userMember.filter((user) => {
                      const expiredAt = new Date(user.expiredAt);
                      const today = new Date();
                      return expiredAt < today;
                    }).length
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="flex items-center gap-2">
            <SpokeSpinner size="md" />
            <span className="text-md font-medium">Loading...</span>
          </div>
        </div>
      )}
    </SidebarInset>
  );
}
