import z from "zod";

export type FormFieldSchema = {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "checkbox" | "radio";
  required?: boolean;
  options?: {
    label: string;
    value: string;
  }[];
};

export const memberFormSchema: FormFieldSchema[] = [
  {
    name: "nama",
    label: "Nama Lengkap",
    type: "text",
    required: true,
  },
  {
    name: "alamat",
    label: "Alamat",
    type: "text",
    required: true,
  },
  {
    name: "no_hp",
    label: "Nomor HP",
    type: "text",
    required: true,
  },
  {
    name: "tgl_daftar",
    label: "Tanggal Daftar",
    type: "date",
    required: true,
  },
  {
    name: "periode_mulai",
    label: "Periode Mulai",
    type: "date",
    required: true,
  },
  {
    name: "periode_berakhir",
    label: "Periode Berakhir",
    type: "date",
    required: true,
  },
];

export const memberDataSchema = z
  .object({
    nama: z.string().min(1, { message: "Nama tidak boleh kosong" }),
    alamat: z.string().min(1, { message: "Alamat tidak boleh kosong" }),
    no_hp: z.string().min(1, { message: "Nomor HP tidak boleh kosong" }),
    tgl_daftar: z
      .string()
      .min(1, { message: "Tanggal Daftar tidak boleh kosong" }),
    periode_mulai: z
      .string()
      .min(1, { message: "Periode Mulai tidak boleh kosong" }),
    periode_berakhir: z
      .string()
      .min(1, { message: "Periode Berakhir tidak boleh kosong" }),
  })
  .refine((data) => data.periode_berakhir >= data.periode_mulai, {
    message: "Periode Berakhir tidak boleh lebih kecil dari Periode Mulai",
    path: ["periode_berakhir"],
  });

export const hargaFormSchema: FormFieldSchema[] = [
  {
    name: "nama",
    label: "Nama",
    type: "text",
    required: true,
  },
  {
    name: "harga",
    label: "Harga",
    defaultValue: 0,
    //@ts-ignore
    type: "currency", // custom type
    required: true,
  },
  {
    name: "keterangan",
    label: "Keterangan",
    type: "text",
    required: true,
  },
];

export const hargaDataSchema = z
  .object({
    nama: z.string().min(1, { message: "Nama tidak boleh kosong" }),
    keterangan: z.string().min(1, { message: "Keterangan tidak boleh kosong" }),
    harga: z.number().min(1, { message: "Harga tidak boleh kosong" }),
  })
  .refine((data) => data.harga > 0, {
    message: "Harga tidak boleh kosong",
    path: ["harga"],
  });

export const userFormSchema: FormFieldSchema[] = [
  {
    name: "nama",
    label: "Nama",
    type: "text",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "text",
  },
];

export const userDataSchema = z.object({
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  password: z.string().min(1, { message: "Password tidak boleh kosong" }),
});

// Untuk edit user
export const editUserSchema = z.object({
  nama: z.string().min(1),
  password: z.string().optional().or(z.literal("")),
});

export const kunjunganMemberFormSchema: FormFieldSchema[] = [
  {
    name: "id",
    label: "ID",
    type: "text",
    required: true,
  },
  {
    name: "memberId",
    label: "ID Member",
    type: "text",
    required: true,
  },
  {
    name: "tgl_kunjungan",
    label: "Tanggal Kunjungan",
    type: "date",
    required: true,
  },
];

export const kunjunganMemberDataSchema = z.object({
  id: z.string().min(1, { message: "ID tidak boleh kosong" }),
  memberId: z.string().min(1, { message: "ID Member tidak boleh kosong" }),
  tgl_kunjungan: z
    .string()
    .min(1, { message: "Tanggal Kunjungan tidak boleh kosong" }),
});

export const kunjunganNonMemberFormSchema: FormFieldSchema[] = [
  {
    name: "nama",
    label: "Nama",
    type: "text",
    required: true,
  },
  {
    name: "harga_dibayar",
    label: "Harga Dibayar",
    defaultValue: 0,
    //@ts-ignore
    type: "currency", // custom type
    required: true,
  },
];

export const kunjunganNonMemberDataSchema = z.object({
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  harga_dibayar: z
    .number()
    .min(1, { message: "Harga Dibayar tidak boleh kosong" }),
});

export const kasirFormSchema: FormFieldSchema[] = [
  {
    name: "nama",
    label: "Nama",
    type: "text",
    required: true,
  },
  {
    name: "quantity",
    label: "Kuantitas",
    type: "number",
    required: true,
  },
  {
    name: "total",
    label: "Total Dibayar",
    defaultValue: 0,
    //@ts-ignore
    type: "currency", // custom type
    required: true,
  },
];

export const kasirDataSchema = z.object({
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  quantity: z.string().min(1, { message: "Kuantitas tidak boleh kosong" }),
  total: z.number().min(1, { message: "Harga Dibayar tidak boleh kosong" }),
});
