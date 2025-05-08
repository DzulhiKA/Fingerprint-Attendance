import { ColumnDef } from "@tanstack/react-table";

export type TDetailMember = {
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
};

// export const hargaList: THarga[] = [
//     {
//       id: "1",
//       jenis: "Membership",
//       tipe: "Gold",
//       harga: 500000,
//     },
//     {
//       id: "2",
//       jenis: "Membership",
//       tipe: "Silver",
//       harga: 300000,
//     },
//     {
//       id: "3",
//       jenis: "Personal Training",
//       tipe: "Single Session",
//       harga: 100000,
//     },
//   ];
