import { NextRequest, NextResponse } from "next/server";
import qs from "qs";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Expect JSON body from client
    const {
      sn,
      pin,
      nama,
      pwd,
      rfid,
      priv,
      expiredAt,
      tmp, // Pass this as an array or stringified JSON
    } = body;

    // ✅ Validasi expiredAt
    if (!expiredAt) {
      return NextResponse.json(
        { message: "expiredAt wajib diisi" },
        { status: 403 }
      );
    }

    const expiredDate = new Date(expiredAt);
    const today = new Date();

    // Hapus waktu dari hari ini agar hanya bandingkan tanggal
    today.setHours(0, 0, 0, 0);

    if (isNaN(expiredDate.getTime()) || expiredDate < today) {
      return NextResponse.json(
        { message: "Data Member tidak bisa diupload (expired)" },
        { status: 400 }
      );
    }

    // Convert to x-www-form-urlencoded
    const data = qs.stringify({
      sn,
      pin,
      nama,
      pwd,
      rfid,
      priv,
      //   tmp
      tmp: typeof tmp === "string" ? tmp : JSON.stringify(tmp),
    });

    // Forward the request to the external URL
    const response = await axios.post(
      `${process.env.DESKTOP_URL}/user/set`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        maxBodyLength: Infinity,
      }
    );

    return NextResponse.json(
      {
        success: true,
        forwardedResponse: response.data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
