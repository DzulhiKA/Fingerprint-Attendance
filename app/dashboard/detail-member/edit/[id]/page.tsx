"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { hargaDataSchema, hargaFormSchema } from "@/data/schema/form-schema";
import { toast } from "sonner";
import { SpokeSpinner } from "@/components/ui/spinner";

export default function EditHarga() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/db/paket/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const dataRes = await res.json();
        const data = dataRes.data;
        setInitialData({
          nama: data.nama,
          harga: Math.floor(data.harga),
          keterangan: data.keterangan || "",
        });
      } catch (err) {
        toast.error("Gagal memuat data paket");
        router.push("/dashboard/paket");
      }
    }

    if (id) fetchData();
  }, [id, router]);

  //   console.log(initialData);

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
              <BreadcrumbLink href="/dashboard/paket">Paket</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        {initialData ? (
          <FormTable
            schema={hargaFormSchema}
            zodSchema={hargaDataSchema}
            onSubmit={async (data) => {
              try {
                await toast.promise(
                  fetch(`/api/db/paket/${id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      nama: data.nama,
                      harga: data.harga,
                      keterangan: data.keterangan,
                    }),
                  }).then(async (response) => {
                    if (!response.ok) {
                      const errorData = await response.json().catch(() => ({}));
                      throw new Error(
                        errorData.message || "Gagal mengubah data"
                      );
                    }

                    if (response.ok) {
                      router.push("/dashboard/paket");
                    }
                    return response.json();
                  }),
                  {
                    loading: "Menyimpan perubahan...",
                    success: "Data berhasil diperbarui!",
                    error: (err) =>
                      err.message || "Terjadi kesalahan saat mengubah data.",
                  }
                );
              } catch {
                // handled by toast
              }
            }}
            //@ts-ignore
            defaultValues={initialData}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="flex items-center gap-2">
              <SpokeSpinner size="md" />
              <span className="text-md font-medium">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </SidebarInset>
  );
}
