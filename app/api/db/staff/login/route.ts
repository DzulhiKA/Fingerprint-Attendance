import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcrypt";
import Staff from "@/model/staff";

export async function POST(req: NextRequest) {
  try {
    const { nama, password } = await req.json();

    const user = await Staff.findOne({ where: { nama } });

    if (!user) {
      return NextResponse.json(
        { message: "Staff tidak ditemukan." },
        { status: 401 }
      );
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: "Password salah." }, { status: 401 });
    }

    // Login berhasil — jika perlu, buat token di sini
    return NextResponse.json(
      {
        message: "Login berhasil.",
        user: {
          nama: user.nama,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan saat login.", detail: error },
      { status: 500 }
    );
  }
}
