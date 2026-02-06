import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Product from "@/models/Product"
import slugify from "slugify"

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  await connectDB()

  const { slug } = await context.params

  const product = await Product.findOne({ slug })


  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}


