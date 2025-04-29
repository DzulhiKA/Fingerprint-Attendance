import { NextRequest, NextResponse } from "next/server"
import scanLog from "@/model/scanlog"
import sequelize from "@/lib/sequelize"
import axios from "axios"
import qs from "qs"

export async function POST(req: NextRequest) {
  const transaction = await sequelize.transaction()

  try {
    const body = await req.json()
    const { sn } = body

    const dataSn = qs.stringify({ sn })

    const response = await axios.post(
      `${process.env.DESKTOP_URL}/log/all/paging`,
      dataSn,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        maxBodyLength: Infinity,
      }
    )

    const logsFromFingerspot = response?.data?.Data || []

    
    const localLogs = await scanLog.findAll({
      attributes: ["pin", "scan_date"],
    })

    const existingLogsSet = new Set(
      localLogs.map(
        (log: any) => `${log.pin}-${new Date(log.scan_date).toISOString()}`
      )
    )

    const newLogs = logsFromFingerspot.filter((log: any) => {
      const uniqueKey = `${log.PIN}-${new Date(log.DateTime).toISOString()}`
      return !existingLogsSet.has(uniqueKey)
    })

    if (newLogs.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No new scan logs to insert",
      })
    }

    const logsToInsert = newLogs.map((log: any) => ({
      pin: log.PIN,
      scan_date: new Date(log.DateTime),
      mode: log.Mode,
      io_mode: log.IOMode,
      status: log.Status,
      sn: sn,
    }))


    await scanLog.bulkCreate(logsToInsert, { transaction })

    await transaction.commit()

    return NextResponse.json({
      success: true,
      message: "New scan logs inserted successfully",
    })
  } catch (error) {
    console.error("Failed to insert scan logs:", error)
    await transaction.rollback()
    return NextResponse.json(
      { success: false, message: "Failed to insert scan logs", detail: error },
      { status: 500 }
    )
  }
}
