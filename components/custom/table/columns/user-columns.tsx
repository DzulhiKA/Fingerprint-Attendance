"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TUser } from "@/data/user-dummy-data";

export const userColumns: ColumnDef<TUser>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "username", header: "Username" },
    { accessorKey: "role", header: "Role" },

]
