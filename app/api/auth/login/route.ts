import { NextRequest, NextResponse } from "next/server";
import Staff from "@/model/staff";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { nama, password } = await req.json();

  const user = await Staff.findOne({ where: { nama } });
  if (!user)
    return NextResponse.json(
      { error: "User tidak ditemukan" },
      { status: 404 }
    );

  //@ts-ignore
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return NextResponse.json({ error: "Password salah" }, { status: 401 });

  //@ts-ignore
  const token = signToken({ id: user.id, nama });

  const res = NextResponse.json({ message: "Login berhasil" }, { status: 200 });
  res.cookies.set("token", "login-valid", {
    httpOnly: false, // bisa dibaca dari client-side
    maxAge: 60 * 60 * 24, // 1 hari
    path: "/",
    sameSite: "lax",
  });

  return res;
}
