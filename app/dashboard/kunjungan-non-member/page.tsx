// "use client";

// import { AppSidebar } from "@/components/custom/dashboard/app-sidebar";
// import { nonMembersColumn } from "@/components/custom/table/columns/kunjungan-non-member-column";
// // import { nonMembersData } from "@/data/non-member-dummy-data";
// import { DataTable } from "@/components/custom/table/table-data";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { SpokeSpinner } from "@/components/ui/spinner";
// import useSWR from "swr";
// import { toast } from "sonner";
// import { format } from "date-fns";
// import { id } from "date-fns/locale";

// interface NonMember {
//   nama: string;
//   harga_dibayar: string;
//   createdAt: string;
// }

// export default function Member() {
//   const fetcher = (url: string) =>
//     fetch(url)
//       .then((res) => res.json())
//       .then((res) => res);

//   const { data: nonMember, error: nonMemberError } = useSWR<NonMember[], Error>(
//     "/api/db/nonmembers",
//     fetcher
//   );

//   return (
//     <SidebarInset>
//       <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
//         <SidebarTrigger className="-ml-1" />
//         <Separator orientation="vertical" className="mr-2 h-4" />
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem className="hidden md:block">
//               <BreadcrumbLink>Kunjungan</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator className="hidden md:block" />
//             <BreadcrumbItem>
//               <BreadcrumbPage>Non Member</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//       </header>
//       <div className="flex flex-1 flex-col gap-4 p-4">
//         {nonMember ? (
//           <DataTable
//             data={nonMember}
//             //@ts-ignore
//             columns={nonMembersColumn}
//             filter="nama"
//             addLink={true}
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center">
//             <div className="flex items-center gap-2">
//               <SpokeSpinner size="md" />
//               <span className="text-md font-medium">Loading...</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </SidebarInset>
//   );
// }

"use client"

import { AppSidebar } from "@/components/custom/dashboard/app-sidebar"
import { nonMembersColumn } from "@/components/custom/table/columns/kunjungan-non-member-column"
// import { nonMembersData } from "@/data/non-member-dummy-data";
import { DataTable } from "@/components/custom/table/table-data"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SpokeSpinner } from "@/components/ui/spinner"
import useSWR from "swr"
import { toast } from "sonner"
import { format } from "date-fns"
import { id } from "date-fns/locale"

interface NonMember {
  nama: string
  harga_dibayar: string
  createdAt: string
}

export default function Member() {
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => res)

  const { data: nonMember, error: nonMemberError } = useSWR<NonMember[], Error>(
    "/api/db/nonmembers",
    fetcher
  )

  const handleExportPDF = async () => {
    try {
      const res = await fetch("/api/db/nonmembers/export");
      if (!res.ok) throw new Error("Gagal mengunduh PDF")

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "laporan-nonmembers.pdf"
      document.body.appendChild(link)
      link.click()
      link.remove()

      toast.success("Berhasil mengunduh PDF!")
    } catch (err) {
      toast.error("Gagal mengunduh PDF!")
    }
  }

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
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Data Kunjungan Non Member</h2>
          <button
            onClick={handleExportPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Export PDF
          </button>
        </div>

        {nonMember ? (
          <DataTable
            data={nonMember}
            //@ts-ignore
            columns={nonMembersColumn}
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
  )
}
