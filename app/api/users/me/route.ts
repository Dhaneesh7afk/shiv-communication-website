import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import User from "@/models/User"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await connectDB()
  const user = await User.findById(session.user.id).lean()
  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    image: user.image,
    address: user.address,
    authProvider: user.authProvider,
    phoneVerified: user.phoneVerified,
  })
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const updates: Record<string, any> = {}

  if (typeof body.name === "string") updates.name = body.name
  if (typeof body.phone === "string") updates.phone = body.phone
  if (typeof body.image === "string") updates.image = body.image
  if (typeof body.phoneVerified === "boolean") updates.phoneVerified = body.phoneVerified
  if (body.address && typeof body.address === "object") {
    updates.address = {
      line1: body.address.line1 ?? "",
      area: body.address.area ?? "",
      city: body.address.city ?? "",
      pincode: body.address.pincode ?? "",
    }
  }

  await connectDB()
  const user = await User.findByIdAndUpdate(session.user.id, { $set: updates }, { new: true })
  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    image: user.image,
    address: user.address,
    authProvider: user.authProvider,
    phoneVerified: user.phoneVerified,
  })
}

export async function DELETE() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await connectDB()
  await User.findByIdAndDelete(session.user.id)
  return NextResponse.json({ ok: true })
}
