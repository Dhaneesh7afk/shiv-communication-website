import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { admin } from "@/lib/firebaseAdmin"
import { connectDB } from "@/lib/db"
import User from "@/models/User"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { idToken } = await req.json()
  const decoded = await admin.auth().verifyIdToken(idToken)
  if (!decoded.phone_number) {
    return NextResponse.json({ error: "Phone not verified" }, { status: 400 })
  }

  await connectDB()
  const updated = await User.findByIdAndUpdate(
    session.user.id,
    { $set: { phone: decoded.phone_number, phoneVerified: true } },
    { new: true }
  ).lean()

  return NextResponse.json(updated)
}
