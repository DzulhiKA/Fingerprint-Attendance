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
import z from "zod";
import useSWR from "swr";

interface Paket {
  id: string;
  nama: string;
  harga: string;
  keterangan: string;
  createdAt: string;
  updatedAt: string;
}

export type FormFieldSchema = {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "checkbox" | "radio";
  required?: boolean;
  options?: {
    label: string;
    value: string;
  }[];
};

export default function EditDetailmember() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/db/detailuser/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const dataRes = await res.json();
        const data = dataRes.data;
        setInitialData({
          user_id: String(data.user_id),
          paket_id: String(data.paket_id), // konversi string ke number
          nama: data.nama,
          alamat: data.alamat,
          no_hp: String(data.no_hp),
        });
      } catch (err) {
        toast.error("Gagal memuat data paket");
        router.push("/dashboard/detail-member");
      }
    }

    if (id) fetchData();
  }, [id, router]);

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => res.data);

  const { data: paket, error: paketError } = useSWR<Paket[], Error>(
    "/api/db/paket",
    fetcher
  );

  const detailMemberDataSchema = z.object({
    user_id: z.string().min(1, { message: "User ID tidak boleh kosong" }),
    paket_id: z.string().min(1, { message: "Paket tidak boleh kosong" }),
    nama: z.string().min(1, { message: "Nama tidak boleh kosong" }),
    alamat: z.string().min(1, { message: "Alamat tidak boleh kosong" }),
    no_hp: z.string().min(1, { message: "No HP tidak boleh kosong" }),
  });

  const detailMemberFormSchema: FormFieldSchema[] = [
    {
      name: "user_id",
      label: "Member ID",
      type: "text",
      required: true,
    },
    {
      name: "paket_id",
      label: "Paket",
      type: "select",
      required: true,
      options: (paket || []).map((p) => ({
        label: p.nama,
        value: String(p.id),
      })),
    },
    {
      name: "nama",
      label: "Nama",
      type: "text",
      required: true,
    },
    {
      name: "alamat",
      label: "Alamat",
      type: "text",
      required: true,
    },
    {
      name: "no_hp",
      label: "No HP",
      type: "text",
      required: true,
    },
  ];

  // console.log(initialData);

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
              <BreadcrumbLink href="/dashboard/detail-member">
                Detail Member
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        {initialData && paket ? (
          <FormTable
            schema={detailMemberFormSchema}
            zodSchema={detailMemberDataSchema}
            onSubmit={async (data) => {
              try {
                await toast.promise(
                  fetch(`/api/db/detailuser/${id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      user_id: data.user_id,
                      paket_id: Number(data.paket_id), // konversi string ke number
                      nama: data.nama,
                      alamat: data.alamat,
                      no_hp: data.no_hp,
                    }),
                  }).then(async (response) => {
                    if (!response.ok) {
                      const errorData = await response.json().catch(() => ({}));
                      throw new Error(
                        errorData.message || "Gagal mengubah data"
                      );
                    }

                    if (response.ok) {
                      router.push("/dashboard/detail-member");
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
