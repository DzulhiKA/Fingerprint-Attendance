import { NextRequest, NextResponse } from "next/server";
import sequelize from "@/lib/sequelize";
import Staff from "@/model/staff";
import { hash } from "bcrypt";

// GET all
export async function GET() {
  try {
    await sequelize.authenticate();
    const data = await Staff.findAll({ order: [["createdAt", "DESC"]] });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch", detail: error },
      { status: 500 }
    );
  }
}

// POST create
export async function POST(req: NextRequest) {
  try {
    const { nama, password } = await req.json();

    const checkUser = await Staff.findOne({ where: { nama: nama } });

    if (checkUser) {
      return NextResponse.json(
        {
          message: "Staff dengan nama ini sudah ada.",
        },
        {
          status: 409,
        }
      );
    }

    // hash password
    const hashedPassword = await hash(password, 10);

    const newData = await Staff.create({
      nama: nama,
      password: hashedPassword,
    });

    return NextResponse.json(newData, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create", detail: error },
      { status: 500 }
    );
  }
}
