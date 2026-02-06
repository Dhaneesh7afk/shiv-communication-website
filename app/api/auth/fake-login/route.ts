import { NextResponse } from "next/server"
import User from "@/models/User"
import { connectDB as db } from "@/lib/db"

export async function POST() {
  await db()

  let user = await User.findOne({ phone: "9999999999" })

  if (!user) {
    user = await User.create({ phone: "9999999999", name: "Guest" })
  }

  const res = NextResponse.json({ ok: true })

  res.cookies.set("token", user._id.toString(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  })

  return res
}
