import { ColumnDef } from "@tanstack/react-table";

export type THarga = {
    id: string;
    jenis: string;
    tipe: string;
    harga: number;
}

export const hargaList: THarga[] = [
    {
      id: "1",
      jenis: "Membership",
      tipe: "Gold",
      harga: 500000,
    },
    {
      id: "2",
      jenis: "Membership",
      tipe: "Silver",
      harga: 300000,
    },
    {
      id: "3",
      jenis: "Personal Training",
      tipe: "Single Session",
      harga: 100000,
    },
  ];


