// app/api/paket/route.ts

import { NextRequest, NextResponse } from "next/server"
import Paket from "@/model/paket"

export async function GET() {
  try {
    const data = await Paket.findAll()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data paket" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nama, harga, keterangan } = body

    const created = await Paket.create({ nama, harga, keterangan })
    return NextResponse.json({ success: true, data: created })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal membuat paket" },
      { status: 500 }
    )
  }
}
