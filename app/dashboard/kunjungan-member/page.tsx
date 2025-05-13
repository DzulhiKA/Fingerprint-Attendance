"use client";

import { AppSidebar } from "@/components/custom/dashboard/app-sidebar";
import { kunjunganMembersColumn } from "@/components/custom/table/columns/kunjungan-member-column";
import { DataTable } from "@/components/custom/table/table-data";
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
import { useRouter } from "next/navigation";

interface KunjunganMember {
  pin: string;
  scan_date: string;
}

interface UserMember {
  pin: string;
  nama: string;
}

export default function Member() {
  const router = useRouter();
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => res);

  const { data: kunjunganMember, error: kunjuganMemberError } = useSWR<
    KunjunganMember[],
    Error
  >("/api/db/scanlog", fetcher);

  const { data: userMember, error: userMemberError } = useSWR<
    UserMember[],
    Error
  >("/api/db/user", fetcher);

  const result = kunjunganMember
    ?.map((log) => {
      const user = userMember?.find((u) => u.pin === log.pin);
      if (user) {
        return {
          pin: log.pin,
          nama: user.nama,
          scan_date: log.scan_date,
        };
      }
      return null;
    })
    .filter(Boolean); // Menghapus hasil yang null

  // console.log(kunjunganMember);

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink>Kunjungan</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Member</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {result ? (
          <DataTable
            data={result}
            //@ts-ignore
            columns={kunjunganMembersColumn}
            filter="nama"
            onClickAdd={async () => {
              try {
                await toast.promise(
                  fetch("/api/db/scanlog", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sn: "66208024520233" }),
                  }).then((res) => {
                    if (!res.ok) throw new Error();
                    if (res.ok) location.reload();
                    return res.json();
                  }),
                  {
                    loading: "Mengambil data...",
                    success: "Berhasil mengambil dan menyimpan scanlog!",
                    error: "Gagal mengambil data.",
                  }
                );

                // Reload halaman setelah berhasil
                // location.reload();
              } catch (error) {
                // Error sudah ditangani oleh toast
              }
            }}
            addLink={false}
            buttonAdd={true}
            optionMenu={false}
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
