import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Product from "@/models/Product"
import { requireAdmin } from "@/lib/adminAuth"

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await requireAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    await connectDB()

    const { id } = await context.params
    const body = await req.json()

    const updated = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    )

    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await requireAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    await connectDB()
    const { id } = await context.params
    const product = await Product.findById(id).lean()
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await requireAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    await connectDB()

    const { id } = await context.params

    await Product.findByIdAndDelete(id)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
