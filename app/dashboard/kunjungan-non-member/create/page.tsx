"use client";

import { AppSidebar } from "@/components/custom/dashboard/app-sidebar";
import { FormTable } from "@/components/custom/form/form-table";
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
import {
  kunjunganNonMemberDataSchema,
  kunjunganNonMemberFormSchema,
} from "@/data/schema/form-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function createHarga() {
  const router = useRouter();
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink>Manage Data</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/kunjungan-non-member">
                Kunjungan Non Member
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Tambah</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <FormTable
          schema={kunjunganNonMemberFormSchema}
          zodSchema={kunjunganNonMemberDataSchema}
          onSubmit={async (data) => {
            try {
              const response = await fetch("/api/db/nonmembers", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  nama: data.nama,
                  harga_dibayar: data.harga_dibayar,
                }),
              });

              if (!response.ok) {
                throw new Error("Gagal menyimpan data");
              }

              const result = await response.json();
              toast.success("Data berhasil disimpan!");
              // console.log("Response:", result);
              router.push("/dashboard/kunjungan-non-member");
            } catch (error) {
              // console.error("Submit error:", error);
              toast.error("Terjadi kesalahan saat menyimpan data.");
            }
          }}
        ></FormTable>
      </div>
    </SidebarInset>
  );
}
