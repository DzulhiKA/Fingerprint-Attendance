"use client";

import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SpokeSpinner } from "@/components/ui/spinner";

export default function CekKoneksi() {
  const sn = "66208024520233"
  const handleCekKoneksi = async () => {
    try {
      await toast.promise(
        fetch("/api/device/cek_koneksi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sn }),
        }).then(async (res) => {
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data?.message || "Koneksi gagal.");
          }
          return res.json();
        }),
        {
          loading: "Memeriksa koneksi perangkat...",
          success: "Perangkat berhasil terhubung!",
          error: "Gagal terhubung ke perangkat.",
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink>Info Device</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Cek Koneksi</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 justify-center items-center flex-col gap-4 p-4">
        <Button onClick={handleCekKoneksi}>Cek Koneksi</Button>
      </div>
    </SidebarInset>
  );
}
