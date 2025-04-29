import { NextRequest, NextResponse } from "next/server";
import qs from 'qs';
import axios from 'axios';


export async function POST(req: NextRequest) {
  try {
    
    const body = await req.json() // Expect JSON body from client
    const {
      sn
    } = body

    // Convert to x-www-form-urlencoded
    const data = qs.stringify({
      sn
    })

    // Forward the request to the external URL
    const response = await axios.post(`${process.env.DESKTOP_URL}/user/all/paging`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      maxBodyLength: Infinity
    })

    return NextResponse.json({
        success: true,
        data: response.data.Data
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
