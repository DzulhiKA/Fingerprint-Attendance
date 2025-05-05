"use client";

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
import { memberLogColumns } from "@/components/custom/table/columns/member-log-columns";

interface MemberLog {
  pin: string;
  nama: string;
  action: string;
  old_expired: string;
  new_expired: string;
  createdAt: string;
  updatedAt: string;
}

export default function Member() {
  const router = useRouter();
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => res);

  const { data: memberLog, error: memberLogError } = useSWR<MemberLog[], Error>(
    "/api/db/member_log",
    fetcher
  );

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink>Log</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Member Log</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {memberLog ? (
          <DataTable
            data={memberLog}
            //@ts-ignore
            columns={memberLogColumns}
            filter="nama"
            onClickAdd={async () => {
              // try {
              //   await toast.promise(
              //     fetch("/api/db/scanlog", {
              //       method: "POST",
              //       headers: { "Content-Type": "application/json" },
              //       body: JSON.stringify({ sn: "66208024520233" }),
              //     }).then((res) => {
              //       if (!res.ok) throw new Error();
              //       if(res.ok) location.reload();
              //       return res.json();
              //     }),
              //     {
              //       loading: "Mengambil data...",
              //       success: "Berhasil mengambil dan menyimpan scanlog!",
              //       error: "Gagal mengambil data.",
              //     }
              //   );
              //   // Reload halaman setelah berhasil
              //   // location.reload();
              // } catch (error) {
              //   // Error sudah ditangani oleh toast
              // }
            }}
            addLink={false}
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
