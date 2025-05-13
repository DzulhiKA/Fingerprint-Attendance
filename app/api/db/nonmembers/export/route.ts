import { NextResponse } from "next/server"
import puppeteer from "puppeteer"
import sequelize from "@/lib/sequelize"
import NonMember from "@/model/nonmember"
import { generateDynamicHTML } from "@/lib/pdfTemplate"

export async function GET() {
  try {
    await sequelize.authenticate()
    const data = await NonMember.findAll({ order: [["createdAt", "DESC"]] })

    const html = generateDynamicHTML(data, {
      title: "Laporan Non Members",
      columns: ["nama", "harga_dibayar", "createdAt"],
      headers: ["Nama", "Harga Dibayar", "Tanggal"],
    })

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: "domcontentloaded" })

    const pdfBuffer = await page.pdf({ format: "A4" })
    await browser.close()

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=laporan-nonmembers.pdf",
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal membuat PDF", detail: error },
      { status: 500 }
    )
  }
}
