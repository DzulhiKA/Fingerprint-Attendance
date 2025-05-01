"use client";

import { AppSidebar } from "@/components/custom/dashboard/app-sidebar";
import { DataTable } from "@/components/custom/table/table-data";
import { memberColumn } from "@/components/custom/table/columns/member-columns";
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

interface UserMember {
  pin: string;
  nama: string;
  expireAt: string;
}

export default function Member() {
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => res);

  const { data: userMember, error: userMemberError } = useSWR<
    UserMember[],
    Error
  >("/api/db/user", fetcher);

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
              <BreadcrumbPage>Member</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {userMember ? (
          <DataTable
            data={userMember}
            //@ts-ignore
            columns={memberColumn}
            filter="nama"
            onClickAdd={async () => {
              try {
                await toast.promise(
                  fetch("/api/db/post_user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sn: "66208024520233" }),
                  }).then((res) => {
                    if (!res.ok) throw new Error();
                    if(res.ok) location.reload();
                    return res.json();
                  }),
                  {
                    loading: "Mengambil data...",
                    success: "Berhasil mengambil dan menyimpan member!",
                    error: "Gagal mengambil data.",
                  }
                );
            
                // Reload halaman setelah berhasil
                
              } catch (error) {
                // Error sudah ditangani oleh toast
              }
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
