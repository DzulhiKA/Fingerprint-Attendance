import { NextRequest, NextResponse } from "next/server"
import scanLog from "@/model/scanlog"
import sequelize from "@/lib/sequelize"

export async function GET(req: NextRequest) {
  try {
    await sequelize.authenticate()
    const data = await scanLog.findAll({ order: [["scan_date", "DESC"]] })
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch scan logs", detail: error },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const record = await scanLog.create(body)
    return NextResponse.json(record, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create scan log", detail: error },
      { status: 500 }
    )
  }
}
