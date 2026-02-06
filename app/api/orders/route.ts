import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Order from "@/models/Order"
import { requireAdmin } from "@/lib/adminAuth"

export async function GET() {
  try {
    const isAdmin = await requireAdmin()
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    await connectDB()

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json(orders)
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }
}
