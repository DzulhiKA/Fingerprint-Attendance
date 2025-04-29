import { NextRequest, NextResponse } from "next/server"
import NonMember from "@/model/nonmember"
import sequelize from "@/lib/sequelize"

// GET all
export async function GET() {
  try {
    await sequelize.authenticate()
    const data = await NonMember.findAll({ order: [["tgl_kunjungan", "DESC"]] })
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch", detail: error },
      { status: 500 }
    )
  }
}

// POST create
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newData = await NonMember.create(body)
    return NextResponse.json(newData, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create", detail: error },
      { status: 500 }
    )
  }
}
