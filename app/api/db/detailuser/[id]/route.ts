// app/api/detailuser/[id]/route.ts

import { NextRequest, NextResponse } from "next/server"
import DetailUser from "@/model/detailuser"
import User from "@/model/user"
import Paket from "@/model/paket"

// Relasi
User.hasOne(DetailUser, { foreignKey: "user_id", sourceKey: "pin" })
DetailUser.belongsTo(User, { foreignKey: "user_id", targetKey: "pin" })
DetailUser.belongsTo(Paket, { foreignKey: "paket_id" })

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const detail = await DetailUser.findByPk(params.id, {
    include: [User, Paket],
  })
  if (!detail) {
    return NextResponse.json(
      { success: false, message: "Data tidak ditemukan" },
      { status: 404 }
    )
  }
  return NextResponse.json({ success: true, data: detail })
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json()
  const detail = await DetailUser.findByPk(params.id)
  if (!detail) {
    return NextResponse.json(
      { success: false, message: "Data tidak ditemukan" },
      { status: 404 }
    )
  }
  await detail.update(body)
  return NextResponse.json({ success: true, data: detail })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const detail = await DetailUser.findByPk(params.id)
  if (!detail) {
    return NextResponse.json(
      { success: false, message: "Data tidak ditemukan" },
      { status: 404 }
    )
  }
  await detail.destroy()
  return NextResponse.json({ success: true, message: "Data dihapus" })
}
