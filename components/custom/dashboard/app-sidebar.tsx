"use client";

import { usePathname } from "next/navigation";

import * as React from "react";

import { SearchForm } from "./search-form";
import { VersionSwitcher } from "./version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Home",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Info Device",
      url: "#",
      items: [
        {
          title: "Cek Koneksi",
          url: "/dashboard/info-device",
        },
      ],
    },
    {
      title: "Manage Data",
      url: "#",
      items: [
        {
          title: "Member",
          url: "/dashboard/member",
        },
        {
          title: "Detail Member",
          url: "/dashboard/detail-member",
        },
        {
          title: "Paket",
          url: "/dashboard/paket",
        },
        {
          title: "Kasir",
          url: "/dashboard/kasir",
        },
        {
          title: "Staff",
          url: "/dashboard/user",
        },
      ],
    },
    {
      title: "Kunjungan",
      url: "#",
      items: [
        {
          title: "Member",
          url: "/dashboard/kunjungan-member",
        },
        {
          title: "Non Member",
          url: "/dashboard/kunjungan-non-member",
        },
      ],
    },
    {
      title: "Log",
      url: "#",
      items: [
        {
          title: "Member",
          url: "/dashboard/member-log",
        },
      ],
    },
    // {
    //   title: "Laporan",
    //   url: "#",
    //   items: [
    //     {
    //       title: "Member",
    //       url: "#",
    //     },
    //     {
    //       title: "Non Member",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item, i) => (
          <SidebarGroup key={i}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton
                      asChild
                      isActive={true ? pathname === item.url : false}
                    >
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
