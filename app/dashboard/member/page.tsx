"use client";

import { useMemo } from "react";
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
  id: string;
  pin: string;
  nama: string;
  expireAt: string;
}

interface deviceMember {
  PIN: string;
  Name: string;
  Password: string;
  Privilege: string;
  Template: [];
  RFID: string;
}

export default function Member() {
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => res);

  const fetcherPost = async ([url, body]: [string, any]) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message || "Gagal fetch data");
    }

    const json = await res.json();
    return json;
  };

  const { data: userMember, error: userMemberError } = useSWR<
    UserMember[],
    Error
  >("/api/db/user", fetcher);

  const { data: deviceMember, error: deviceMemberError } = useSWR<
    deviceMember[],
    Error
  >(["/api/device/download_user", { sn: "66208024520233" }], fetcherPost);

  const mergedUserMember = useMemo(() => {
    if (!userMember || !deviceMember) return null;
    if (userMember.length === 0 || deviceMember.length === 0) return [];

    const devicePins = new Set(deviceMember.map((dm) => String(dm.PIN)));

    return userMember.map((user) => ({
      ...user,
      inDevice: devicePins.has(String(user.pin)),
    }));
  }, [userMember, deviceMember]);
  console.log("device", deviceMember);
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
        {mergedUserMember ? (
          <DataTable
            data={mergedUserMember}
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
                    if (res.ok) location.reload();
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
