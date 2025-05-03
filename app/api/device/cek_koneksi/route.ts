// app/api/fingerspot/cek-koneksi/route.ts

import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import qs from "qs"
import { json } from "sequelize"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sn } = body

    if (!sn) {
      return NextResponse.json(
        { success: false, message: "SN tidak boleh kosong" },
        { status: 400 }
      )
    }

    const data = qs.stringify({ sn })

    const response = await axios.post(
      `${process.env.DESKTOP_URL}/dev/info`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 3000,
      }
    )

    return NextResponse.json({
      success: true,
      message : 'Mesin Fingerspot Berhasil Terhubung',
      data: {
        'Waktu'        : response.data.DEVINFO.Jam,
        'Jumlah User'  : response.data.DEVINFO.User,
        'Jumlah Admin' : response.data.DEVINFO.Admin,
      }
    })
  } catch (error: any) {
    console.error("Fingerspot connection failed:", error.message)
    return NextResponse.json(
      {
        success: false,
        message: "Gagal terhubung ke mesin Fingerspot",
      },
      {
        status: 500,
      }
    )
  }
}
