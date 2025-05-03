import User from "@/model/user"
import Template from "@/model/template"
import MemberActivityLog from "@/model/memberactivity" // Log aktivitas member
import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import qs from "qs"

// Mendefinisikan interface untuk tipe data FingerspotUser
interface FingerspotUser {
  PIN: string
  Name: string
  Password: string
  Privilege: string
  RFID: string
  Template: string[]
}

export async function POST(req: NextRequest) {
  const transaction = await User.sequelize?.transaction()

  try {
    const body = await req.json()
    const { sn } = body

    const dataSn = qs.stringify({ sn })

    // 1. Ambil data user dari alat Fingerspot
    const response = await axios.post(
      `${process.env.DESKTOP_URL}/user/all/paging`,
      dataSn,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        maxBodyLength: Infinity,
      }
    )

    const fingerspotUsers: FingerspotUser[] = response?.data?.Data || [] // Tentukan tipe fingerspotUsers

    // 2. Ambil data user lokal dan mapping ke Map
    const localUsers = await User.findAll({ attributes: ["pin", "expiredAt"] })
    const localMap = new Map(
      localUsers.map((u) => [
        u.getDataValue("pin"),
        u.getDataValue("expiredAt"),
      ])
    )

    const createdUsers: any[] = []
    const extendedUsers: string[] = []

    for (const fsUser of fingerspotUsers) {
      const pin = fsUser.PIN
      const expiredAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // +30 hari

      if (!localMap.has(pin)) {
        // Member baru
        const newUser = await User.create(
          {
            pin,
            pwd: fsUser.Password,
            priv: fsUser.Privilege,
            rfid: fsUser.RFID,
            nama: fsUser.Name,
            expiredAt,
            sn,
          },
          { transaction }
        )

        await MemberActivityLog.create(
          {
            pin,
            action: "new",
            old_expired: null,
            new_expired: expiredAt,
          },
          { transaction }
        )

        createdUsers.push(newUser)
      } else {
        const oldExpiredValue = localMap.get(pin)
        if (!oldExpiredValue) continue // Skip jika null/undefined

        const oldExpired = new Date(oldExpiredValue)
        if (isNaN(oldExpired.getTime())) continue // Skip jika tanggal tidak valid

        if (expiredAt > oldExpired) {
          // Extend masa aktif
          await User.update({ expiredAt }, { where: { pin }, transaction })

          await MemberActivityLog.create(
            {
              pin,
              action: "extend",
              old_expired: oldExpired,
              new_expired: expiredAt,
            },
            { transaction }
          )

          extendedUsers.push(pin)
        }
      }
    }

    // 3. Simpan template fingerprint untuk user baru
    const tmpData = createdUsers.flatMap((user) => {
      const found = fingerspotUsers.find((u) => u.PIN === user.pin)
      const templates = found?.Template || []
      return templates.map((tmp: string) => ({
        pin: user.pin,
        tmp,
      }))
    })

    if (tmpData.length > 0) {
      await Template.bulkCreate(tmpData, { transaction })
    }

    await transaction?.commit()

    return NextResponse.json({
      success: true,
      message: "Sinkronisasi berhasil",
      newUsers: createdUsers.length,
      extendedUsers: extendedUsers.length,
    })
  } catch (error) {
    console.error("Sync error:", error)
    await transaction?.rollback()
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat sinkronisasi" },
      { status: 500 }
    )
  }
}
