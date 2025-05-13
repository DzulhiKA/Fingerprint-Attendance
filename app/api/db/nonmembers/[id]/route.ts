import { NextRequest, NextResponse } from "next/server"
import NonMember from "@/model/nonmember"

// GET by ID
export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params
  const data = await NonMember.findByPk(id)

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(data)
}

// PUT update by ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params
  const body = await req.json()

  const data = await NonMember.findByPk(id)
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await data.update(body)
  return NextResponse.json(data)
}

// DELETE by ID
export async function DELETE(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params

  const data = await NonMember.findByPk(id)
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await data.destroy()
  return NextResponse.json({ message: "Deleted successfully" })
}
