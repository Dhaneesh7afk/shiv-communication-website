import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Product from "@/models/Product"
import { requireAdmin } from "@/lib/adminAuth"
import slugify from "slugify"

// GET → public
export async function GET() {
  await connectDB()
  const isAdmin = await requireAdmin()
  const products = await Product.find(
    isAdmin ? {} : { isActive: true }
  ).sort({ createdAt: -1 })
  return NextResponse.json(products)
}

// POST → admin only
export async function POST(req: Request) {
  try {
    await connectDB()

    const body = await req.json()

    // ✅ SLUG GENERATED HERE
    const slug = slugify(body.title, {
      lower: true,
      strict: true,
    })

    const product = await Product.create({
      ...body,
      slug,
    })

    return NextResponse.json(product)
  } catch (err) {
    console.error("PRODUCT CREATE ERROR", err)
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
}
