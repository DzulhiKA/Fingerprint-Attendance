import User from "@/model/user";
import { NextRequest, NextResponse } from "next/server";
import qs from "qs";
import axios from "axios";
import MemberActivityLog from "@/model/memberactivity";

export async function POST(
//   req: NextRequest,
//   { params }: { params: { pin: string } }
// ) {

req: NextRequest,
{ params }: { params: Promise<{ pin: string }> }
) {
  const { sn, pin } = await req.json();

  // Optional: parse tmp if it's a JSON string
  // const tmpParsed = typeof tmp === 'string' ? JSON.parse(tmp) : tmp;

  const data = qs.stringify({ sn, pin });

  // HAPUS DATA DI DEVICE FINGERSPOT
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.DESKTOP_URL}/user/del`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  // HAPUS DATA DI DATABASE
  const users = await User.destroy({
    where: { pin: pin },
  });

  try {
    const response = await axios.request(config);
    return NextResponse.json(
      {
        message: "Data Berhasil Dihapus Mas!!!",
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

export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { pin: string } }
// ) {
  req: NextRequest,
  { params }: { params: Promise<{ pin: string }> }
) {
  
  try {
    // const { pin } = await params;
    const { expiredAt, oldExpired } = await req.json();
    const pin = (await params).pin;

    if (!expiredAt) {
      return NextResponse.json(
        { success: false, message: "expiredAt is required in request body" },
        { status: 400 }
      );
    }

    // Cari user berdasarkan PIN
    const user = await User.findOne({ where: { pin } });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Update expiredAt langsung dari body
    await user.update({ expiredAt });

    const createLog = await MemberActivityLog.create({
      pin,
      action: "extend",
      old_expired: oldExpired,
      new_expired: expiredAt,
    });

    return NextResponse.json({
      success: true,
      message: "expiredAt updated successfully",
      data: { pin, expiredAt },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to update expiredAt" },
      { status: 500 }
    );
  }
}
