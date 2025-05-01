// app/api/detailuser/route.ts

import { NextRequest, NextResponse } from "next/server"
import DetailUser from "@/model/detailuser"
import User from "@/model/user"
import Paket from "@/model/paket"

// Hubungkan relasi
User.hasOne(DetailUser, { foreignKey: "user_id", sourceKey: "pin" })
DetailUser.belongsTo(User, { foreignKey: "user_id", targetKey: "pin" })

Paket.hasMany(DetailUser, { foreignKey: "paket_id" })
DetailUser.belongsTo(Paket, { foreignKey: "paket_id" })

export async function GET() {
  try {
    const data = await DetailUser.findAll({
      include: [User, Paket],
    })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data detail user" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { user_id, paket_id, nama, alamat, no_hp } = body

    const created = await DetailUser.create({
      user_id,
      paket_id,
      nama,
      alamat,
      no_hp,
    })

    return NextResponse.json({ success: true, data: created })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal membuat detail user" },
      { status: 500 }
    )
  }
}
