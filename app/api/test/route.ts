import { NextRequest, NextResponse } from "next/server";

import sequelize from '@/lib/sequelize';
import User from '@/model/user';
import Template from '@/model/template';


export async function GET(req: any, res: any) {
  try {
    // Connect and sync the DB
    await sequelize.authenticate();
    await sequelize.sync(); // Be cautious in production!

    // Create a test user
    const user = await User.create({
      sn: '1234567890',
      pin: '1',
      nama: 'Test User',
      pwd: 'password123',
      rfid: 'RFID123',
      priv: '0',
      expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    const template = await Template.create({
      pin: '1',
      tmp: [
        {
          pin: '1',
          idx: 10,
          template: 'A1:B2:C3:D4:E5',
          alg_ver: 39
        }
      ]
    });

    return NextResponse.json({
      message: 'User created successfully!',
      data: user
    }, {
        status: 200
    });

  } catch (error) {
    console.error('DB Test Error:', error);
    return NextResponse.json({
      message: 'Something went wrong'
    }, {
        status: 500
    });
  }
}
