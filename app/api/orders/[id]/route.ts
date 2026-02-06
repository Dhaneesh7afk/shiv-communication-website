import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Order from "@/models/Order"
import { requireAdmin } from "@/lib/adminAuth"
import { canTransition } from "@/lib/order-status"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const isAdmin = await requireAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const order = await Order.findById(id).lean()

  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(order)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const isAdmin = await requireAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { status } = await req.json()
  const allowed = ["CREATED", "PAID", "PACKED", "READY", "DELIVERED", "CANCELLED", "FAILED"]
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }

  await connectDB()
  const { id } = await params 
  const order = await Order.findById(id)
  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  if (!canTransition(order.status, status)) {
    return NextResponse.json({ error: "Invalid transition" }, { status: 400 })
  }

  order.status = status
  await order.save()
  const updated = order.toObject()

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(updated)
}
