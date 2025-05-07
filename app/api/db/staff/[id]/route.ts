import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import NonMember from "@/model/staff";
import Staff from "@/model/staff";

// GET by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await Staff.findByPk(id);
  if (!data)
    return NextResponse.json(
      { message: "Data Staff Tidak Ditemukan" },
      { status: 404 }
    );
  return NextResponse.json(data);
}

// PUT update by ID
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { nama, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = await Staff.findByPk(id);
  if (!data)
    return NextResponse.json(
      { message: "Update Data Staff Gagal" },
      { status: 404 }
    );

  if (password === "") {
    await data.update({
      nama,
    });
    return NextResponse.json({ message: "Data Staff Berhasil Diupdate", data });
  }

  await data.update({
    nama,
    password: hashedPassword,
  });
  return NextResponse.json({ message: "Data Staff Berhasil Diupdate", data });
}

// DELETE by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await Staff.findByPk(id);
  if (!data)
    return NextResponse.json(
      { message: "Data Staff Gagal Dihapus" },
      { status: 404 }
    );

  await data.destroy();
  return NextResponse.json({ message: "Data Staff Berhasil Dihapus" });
}
