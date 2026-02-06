import { NextResponse } from "next/server"
import Otp from "@/models/Otp"
import User from "@/models/User"
import { connectDB as db } from "@/lib/db"

export async function POST(req: Request) {
  await db()
  const { phone, otp } = await req.json()

  const record = await Otp.findOne({ phone, otp })

  if (!record || record.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 401 })
  }

  let user = await User.findOne({ phone })
  if (!user) user = await User.create({ phone })

  await Otp.deleteMany({ phone })

  const res = NextResponse.json({ success: true })

  res.cookies.set("token", user._id.toString(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  })

  return res
}
