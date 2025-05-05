import { NextRequest, NextResponse } from "next/server";
import sequelize from "@/lib/sequelize";
import MemberActivityLog from "@/model/memberactivity";
import User from "@/model/user";

export async function GET(req: NextRequest) {
  try {
    await sequelize.authenticate();

    const logData = await MemberActivityLog.findAll({
      order: [["createdAt", "DESC"]],
    });

    const userData = await User.findAll();

    // Gabungkan nama ke logData berdasarkan pin yang sama
    const mergedLog = logData.map((log) => {
      //@ts-ignore
      const user = userData.find((u) => u.pin === log.pin);
      return {
        ...log.toJSON(), // pastikan jika log adalah instance dari model Sequelize
        //@ts-ignore
        nama: user?.nama || "Tidak diketahui",
      };
    });

    return NextResponse.json(mergedLog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch scan logs", detail: error },
      { status: 500 }
    );
  }
}
