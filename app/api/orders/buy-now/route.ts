import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import Order from "@/models/Order"
import Product from "@/models/Product"
import User from "@/models/User"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { productId } = await req.json()

  await connectDB()
  const user = await User.findById(session.user.id)
  if (
    !user ||
    !user.phone ||
    !user.phoneVerified ||
    !user.address?.line1 ||
    !user.address?.area ||
    !user.address?.city ||
    !/^\d{6}$/.test(user.address?.pincode || "")
  ) {
    return NextResponse.json({ error: "Complete profile before checkout" }, { status: 400 })
  }
  const product = await Product.findById(productId)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  const razorpayOrder = await razorpay.orders.create({
    amount: product.price * 100,
    currency: "INR",
  })

  const order = await Order.create({
    userId: user._id.toString(),
    userAuthProvider: user.authProvider,
    userSnapshot: {
      name: user.name,
      phone: user.phone,
      address: user.address,
    },
    customer: {
      name: user.name,
      phone: user.phone,
      address: `${user.address?.line1 || ""}, ${user.address?.area || ""}, ${user.address?.city || ""} ${user.address?.pincode || ""}`.trim(),
    },
    items: [
      {
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: 1,
      },
    ],
    amount: product.price,
    payment: {
      razorpayOrderId: razorpayOrder.id,
      razorpay_order_id: razorpayOrder.id,
    },
    status: "CREATED",
  })

  return NextResponse.json({
    razorpayOrderId: razorpayOrder.id,
    amount: product.price * 100,
    orderId: order._id,
  })
}
