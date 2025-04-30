// import { NextRequest, NextResponse } from "next/server"
// import scanLog from "@/model/scanlog"
// import sequelize from "@/lib/sequelize"

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()
//     const record = await scanLog.create(body)
//     return NextResponse.json(record, { status: 201 })
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to create scan log", detail: error },
//       { status: 500 }
//     )
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import qs from "qs";
import scanLog from "@/model/scanlog";
import sequelize from "@/lib/sequelize";

export async function POST(req: NextRequest) {
  const transaction = await scanLog.sequelize?.transaction();

  try {
    const body = await req.json(); // Expect JSON body from client
    const { sn } = body;

    // Convert to x-www-form-urlencoded
    const dataSn = qs.stringify({
      sn,
    });

    // 1. Ambil data user dari Fingerspot
    const ScanlogResponse = await axios.post(
      `${process.env.DESKTOP_URL}/scanlog/new`,
      dataSn,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        maxBodyLength: Infinity,
      }
    );

    const ScanlogData = (await ScanlogResponse?.data?.Data) || [];

    if (ScanlogData.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No scanlog to create",
      });
    }

    // 4. Mapping data user baru
    const DataMap = ScanlogData.map((item: any) => ({
      pin: item.PIN,
      sn: sn,
      verifymode: item.VerifyMode,
      scan_date: item.ScanDate,
      iomode: item.IOMode,
      workcode: item.WorkCode,
    }));

    const createdScanlog = await scanLog.bulkCreate(DataMap, {
      transaction,
      returning: true,
    });

    await transaction?.commit();

    return NextResponse.json({
      success: true,
      message: "New Scanlog created successfully",
    });
  } catch (error) {
    console.error(error);
    await transaction?.rollback();
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await sequelize.authenticate();
    const data = await scanLog.findAll({ order: [["scan_date", "DESC"]] });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch scan logs", detail: error },
      { status: 500 }
    );
  }
}
