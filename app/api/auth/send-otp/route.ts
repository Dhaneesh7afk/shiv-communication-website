import { NextResponse } from "next/server"
import Otp from "@/models/Otp"
import { connectDB as db } from "@/lib/db"

export async function POST(req: Request) {
  await db()
  const { phone } = await req.json()

  if (!phone || phone.length !== 10) {
    return NextResponse.json({ error: "Invalid phone" }, { status: 400 })
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  await Otp.deleteMany({ phone })

  await Otp.create({
    phone,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
  })

  // 🔥 TEMP: log OTP (later integrate SMS)
  console.log("OTP:", otp)

  return NextResponse.json({ success: true })
}
