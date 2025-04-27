import User from '@/model/user';
import { NextRequest, NextResponse } from "next/server";
import qs from 'qs';
import axios from 'axios';

export async function POST(req: NextRequest) {

    const { sn, pin } = await req.json();

    // Optional: parse tmp if it's a JSON string
    // const tmpParsed = typeof tmp === 'string' ? JSON.parse(tmp) : tmp;

   
  const data = qs.stringify({ sn, pin });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.DESKTOP_URL}/user/del`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };

  
  
  try {
    

const response = await axios.request(config);
    return NextResponse.json({
      message: "Berhasil Mas!!!"
    }, {
        status: 200
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Something went wrong'
    }, {
        status: 500
    });
  }
}
