import User from '@/model/user';
import Template from '@/model/template';
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import qs from 'qs';

export async function POST(req: NextRequest) {
  const transaction = await User.sequelize?.transaction();

  try {
    const body = await req.json() // Expect JSON body from client
        const {
          sn
        } = body
    
        // Convert to x-www-form-urlencoded
        const dataSn = qs.stringify({
          sn
        })

    // 1. Ambil data user dari Fingerspot
    const fingerspotResponse = await axios.post(`${process.env.DESKTOP_URL}/user/all/paging`, dataSn, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      maxBodyLength: Infinity
    })

    const fingerspotUsers = await fingerspotResponse?.data?.Data || [];

    // 2. Ambil data user dari database lokal
    const localUsers = await User.findAll({
      attributes: ['pin']
    });

    
    //@ts-ignore
    const localPins = localUsers.map(user => user.pin);
    
    // 3. Filter hanya user baru yang belum ada di database
    const newUsers = fingerspotUsers.filter((user: any) => !localPins.includes(user.PIN));

    if (newUsers.length === 0) {
      return NextResponse.json({ success: true, message: 'No new users to create' });
    }

    // 4. Mapping data user baru
    const usersData = newUsers.map((item: any) => ({
      pin: item.PIN,
      pwd: item.Password,
      priv: item.Privilege,
      rfid: item.RFID,
      nama: item.Name,
      expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      sn: sn,
    }));

    const createdUsers = await User.bulkCreate(usersData, { transaction, returning: true });

    // 5. Mapping data tmp baru
    const tmpData = createdUsers.flatMap((user) => {
      //@ts-ignore
      const matching = fingerspotUsers.find((item: any) => item.PIN === user.pin);
      const tmps = matching?.Template || [];
      return tmps.map((tmpItem: any) => ({
        //@ts-ignore
        pin: user.pin,
        tmp: tmpItem
      }));
    });

    if (tmpData.length > 0) {
      await Template.bulkCreate(tmpData, { transaction });
    }

    await transaction?.commit();

    return NextResponse.json({ success: true, message: 'New users and templates created successfully' });

  } catch (error) {
    console.error(error);
    await transaction?.rollback();
    return NextResponse.json({
      success: false,
      message: 'Something went wrong'
    }, { status: 500 });
  }
}
