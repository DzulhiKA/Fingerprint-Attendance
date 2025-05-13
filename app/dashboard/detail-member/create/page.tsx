"use client";

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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import z from "zod";
import { SpokeSpinner } from "@/components/ui/spinner";
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

export default function createDetailMember() {
  const router = useRouter();

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
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {paket ? (
          <FormTable
            schema={detailMemberFormSchema}
            zodSchema={detailMemberDataSchema}
            onSubmit={async (data) => {
              try {
                await toast.promise(
                  fetch("/api/db/detailuser", {
                    method: "POST",
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
                        errorData.message || "Gagal menyimpan data"
                      );
                    }

                    if (response.status === 200) {
                      router.push("/dashboard/detail-member");
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
