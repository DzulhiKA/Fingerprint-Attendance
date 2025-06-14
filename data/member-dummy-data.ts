import { ColumnDef } from "@tanstack/react-table";

export type TMember = {
  pin: string;
  nama: string;
  pwd: string;
  rfid: string;
  sn: string;
  priv: string;
  expiredAt: string;
  inDevice: boolean;
  tmp: [];
};

// export const membersList: TMember[] = [
//     {
//       id: "1",
//       nama: "Andi Wijaya",
//       alamat: "Jl. Merdeka No. 10, Jakarta",
//       no_hp: "081234567890",
//       tgl_daftar: "2024-06-01",
//       periode_mulai: "2024-06-01T00:00:00.000Z",
//       periode_berakhir: "2024-07-01T00:00:00.000Z",
//       tipe_member: "Gold",
//       status: "active",
//     },
//     {
//       id: "2",
//       nama: "Budi Santoso",
//       alamat: "Jl. Sudirman No. 20, Bandung",
//       no_hp: "082345678901",
//       tgl_daftar: "2024-05-15",
//       periode_mulai: "2024-05-15T00:00:00.000Z",
//       periode_berakhir: "2024-06-15T00:00:00.000Z",
//       tipe_member: "Silver",
//       status: "inactive",
//     },
//     {
//       id: "3",
//       nama: "Citra Dewi",
//       alamat: "Jl. Diponegoro No. 5, Surabaya",
//       no_hp: "083456789012",
//       tgl_daftar: "2024-04-10",
//       periode_mulai: "2024-04-10T00:00:00.000Z",
//       periode_berakhir: "2024-05-10T00:00:00.000Z",
//       tipe_member: "Platinum",
//       status: "active",
//     },
//   ];
