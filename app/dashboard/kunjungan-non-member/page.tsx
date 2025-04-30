"use client";

import { AppSidebar } from "@/components/custom/dashboard/app-sidebar";
import { nonMembersColumn } from "@/components/custom/table/columns/kunjungan-non-member-column";
// import { nonMembersData } from "@/data/non-member-dummy-data";
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
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface NonMember {
  nama: string;
  harga_dibayar: string;
  createdAt: string;
}

export default function Member() {
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => res);

  const { data: nonMember, error: nonMemberError } = useSWR<NonMember[], Error>(
    "/api/db/nonmembers",
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
              <BreadcrumbLink>Kunjungan</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Non Member</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {nonMember ? (
          <DataTable
            data={nonMember}
            //@ts-ignore
            columns={nonMembersColumn}
            filter="nama"
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
