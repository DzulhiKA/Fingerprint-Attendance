import { NextRequest, NextResponse } from "next/server";

import sequelize from '@/lib/sequelize';
import User from '@/model/user';
import Template from '@/model/template';
import scanLog from "@/model/scanlog";
// import NonMember from "@/model/nonmember";
import Paket from "@/model/paket";
import DetailUser from "@/model/detailuser";
import Kasir from "@/model/kasir";


export async function GET(req: any, res: any) {
  try {
    // Connect and sync the DB
    await sequelize.authenticate();
    await sequelize.sync(); // Be cautious in production!

    //Create a test user
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

    const kasir = await Kasir.create({
      nama    : "Minyak",
      quantity: 2,
      total   :20000
    });

    const scanlog = await scanLog.create({
      pin: "2",
      workcode: 0,
      sn: "66208024520233",
      verifymode: 2,
      scan_date: "2025-04-29 17:54:55",
      iomode: 1
    })

    // const nonMember = await NonMember.create({
    //   nama: "andri",
    //   harga_dibayar: 20000
    // })

    const paket = await Paket.create({
      nama: "Silver Package",
      harga: "20000",
      keterangan : "Latihan Seminggu 1x"
    })

    const detailUser = await DetailUser.create({
      user_id:"1",
      paket_id:1,
      nama: "Edo",
      no_hp: "12345",
      alamat : "Jl.Burung"
    })

    return NextResponse.json({
      message: 'Migrate Successfully',
    }, {
        status: 200
    });

  } catch (error) {
    console.error("DB Test Error:", error);
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
