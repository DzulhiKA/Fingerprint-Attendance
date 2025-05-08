import { NextRequest, NextResponse } from "next/server";
import NonMember from "@/model/nonmember";
import MemberActivityLog from "@/model/memberactivity";
import Kasir from "@/model/kasir";
import { Op } from "sequelize";

export async function POST(req: NextRequest) {
  const { startDate, endDate } = await req.json();

  if (!startDate || !endDate) {
    return NextResponse.json(
      { success: false, message: "Tanggal mulai dan akhir wajib diisi." },
      { status: 400 }
    );
  }

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  try {
    // Get Data Nonmeber Berdasarkan Tanggal
    const nonmember = await NonMember.findAll({
      where: { createdAt: { [Op.between]: [start, end] } },
    });

    // Get Data Member Activity Berdasarkan Tanggal
    const memberactivity = await MemberActivityLog.findAll({
      where: { createdAt: { [Op.between]: [start, end] } },
    });

    // Get Data Kasir Berdasarkan Tanggal
    const kasir = await Kasir.findAll({
      where: { createdAt: { [Op.between]: [start, end] } },
    });

    //Cek Data Jika Salah Satu Data Kosong Return 'Data Kosong'
    const responseData = {
      "Kasir": kasir.length ? kasir : "Data Kasir Tidak Ditemukan",
      "Non Member": nonmember.length
        ? nonmember
        : "Data NonMember Tidak Ditemukan",
      "Member Activity": memberactivity.length
        ? memberactivity
        : "Data Member Activity Tidak Ditemukan",
    };

    //Cek Data Jika Semua Satu Data Kosong Return 'Semua Data Tidak Ditemukan'
    const isEmpty =
      nonmember.length === 0 &&
      memberactivity.length === 0 &&
      kasir.length === 0;

    if (isEmpty) {
      return NextResponse.json(
        {
          message: "Semua Data Tidak Ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: responseData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Rekap error:", error);
    return NextResponse.json(
      { success: false, message: "Data Tidak Ditemukan" },
      { status: 404 }
    );
  }
}
