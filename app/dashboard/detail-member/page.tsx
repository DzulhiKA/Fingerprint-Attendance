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
import { detailMemberColumns } from "@/components/custom/table/columns/detail-member-columns";

interface DetailMember {
  id: number;
  user_id: number;
  paket_id: number;
  nama: string;
  alamat: string;
  no_hp: number;
  tb_user_copy1: {
    pin: string;
    nama: string;
    expiredAt: string;
  };
  Paket: {
    nama: string;
    harga: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function DetailMember() {
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => res.data);

  const { data: detailMember, error: detailMemberError } = useSWR<
    DetailMember[],
    Error
  >("/api/db/detailuser", fetcher);

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Manage Data</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Detail Member</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {detailMember ? (
          <DataTable
            data={detailMember}
            //@ts-ignore
            columns={detailMemberColumns}
            filter="nama"
            addLink={true}
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
