import { NextRequest, NextResponse } from "next/server";
import Kasir from "@/model/kasir";

export async function GET() {
  try {
    const data = await Kasir.findAll({ order: [["createdAt", "DESC"]] })
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch", detail: error },
      { status: 500 }
    )
  }
}

type KasirItem = {
  nama: string;
  quantity: number;
  total: number;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

  
    for (const item of body) {
      if (
        typeof item.nama !== "string" ||
        typeof item.quantity !== "number" ||
        typeof item.total !== "number"
      ) {
        return NextResponse.json({ message: "Format data tidak valid", item });
      }
    }

    const kasirData = body.map((item: KasirItem) => ({
      nama: item.nama,
      quantity: item.quantity,
      total: item.total,
    }));
    // Simpan ke database dengan bulkCreate
    const result = await Kasir.bulkCreate(body);

    return NextResponse.json({
      message: "Data berhasil disimpan",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Gagal menyimpan data",
      error: error instanceof Error ? error.message : error,
    });
  }
}

// KODE INI JANGAN DIHAPUS,JAGA JAGA JIKA KONSEP POS BERUBAH
// type KasirItem = {
//   nama: string;
//   quantity: number;
//   harga: number;
// };

// export async function POST(req: NextRequest) {
//   try {
//     // ✅ Ambil body dari request
//     const body = await req.json();

//     // ✅ Pastikan body adalah array
//     if (!Array.isArray(body)) {
//       return NextResponse.json({ message: "Request body harus berupa array" }, { status: 400 });
//     }

//     // ✅ Validasi setiap item
//     const kasirData = (body as KasirItem[]).map((item) => {
//       if (
//         typeof item.nama !== "string" ||
//         typeof item.quantity !== "number" ||
//         typeof item.harga !== "number"
//       ) {
//         throw new Error("Data item tidak valid");
//       }

//       return {
//         nama: item.nama,
//         quantity: item.quantity,
//         harga: item.harga,
//         total: item.quantity * item.harga,
//       };
//     });

//     // ✅ Simpan ke database
//     const data = await Kasir.bulkCreate(kasirData);

//     return NextResponse.json({ message: "Data berhasil disimpan", data }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "Terjadi kesalahan saat menyimpan data",
//         error: error instanceof Error ? error.message : String(error),
//       },
//       { status: 500 }
//     );
//   }
// }
