import { NextRequest, NextResponse } from "next/server"
import NonMember from "@/model/nonmember"

// GET by ID
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await NonMember.findByPk(params.id)
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(data)
}

// PUT update by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json()
  const data = await NonMember.findByPk(params.id)
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 })

  await data.update(body)
  return NextResponse.json(data)
}

// DELETE by ID
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await NonMember.findByPk(params.id)
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 })

  await data.destroy()
  return NextResponse.json({ message: "Deleted successfully" })
}
