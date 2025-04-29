import { AppSidebar } from "@/components/custom/dashboard/app-sidebar";
import { kunjunganMemberData } from "@/data/kunjungan-member-dummy-data";
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


export default function Member() {
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
        <DataTable
          data={kunjunganMemberData}
          columns={kunjunganMembersColumn}
          filter="memberId"
        />
      </div>
    </SidebarInset>
  );
}
