// app/api/paket/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import Paket from "@/model/paket";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const paket = await Paket.findByPk(id);
  if (!paket) {
    return NextResponse.json(
      { success: false, message: "Paket tidak ditemukan" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: paket });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const paket = await Paket.findByPk(id);
  if (!paket) {
    return NextResponse.json(
      { success: false, message: "Paket tidak ditemukan" },
      { status: 404 }
    );
  }
  await paket.update(body);
  return NextResponse.json({
    success: true,
    data: paket,
    message: "Paket Berhasil Diupdate",
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const paket = await Paket.findByPk(id);
  if (!paket) {
    return NextResponse.json(
      { success: false, message: "Paket tidak ditemukan" },
      { status: 404 }
    );
  }
  await paket.destroy();
  return NextResponse.json({ success: true, message: "Paket dihapus" });
}
