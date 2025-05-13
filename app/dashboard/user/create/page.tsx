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
import { userDataSchema, userFormSchema } from "@/data/schema/form-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function createUser() {
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
              <BreadcrumbLink>Staff</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <FormTable
          schema={userFormSchema}
          zodSchema={userDataSchema}
          onSubmit={async (data) => {
            try {
              await toast.promise(
                fetch("/api/db/staff", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    nama: data.nama,
                    password: data.password,
                  }),
                }).then(async (response) => {
                  if (response.status === 409) {
                    throw new Error("Staff dengan nama ini sudah ada.");
                  }

                  if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(
                      errorData.message || "Gagal menyimpan data"
                    );
                  }

                  if (response.status === 201) {
                    router.push("/dashboard/user");
                  }

                  return response.json();
                }),
                {
                  loading: "Menyimpan data...",
                  success: "Data berhasil disimpan!",
                  error: (err) =>
                    err.message || "Terjadi kesalahan saat menyimpan data.",
                }
              );
            } catch (error) {
              // Error sudah ditangani di toast.promise
            }
          }}
        ></FormTable>
      </div>
    </SidebarInset>
  );
}
