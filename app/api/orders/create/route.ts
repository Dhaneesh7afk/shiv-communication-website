import Razorpay from "razorpay"
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Order from "@/models/Order"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import User from "@/models/User"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
  try {
    await connectDB()

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { cart, customer, address } = await req.json()
    const user = await User.findById(session.user.id)
    if (!user || !user.phone || !user.phoneVerified) {
      return NextResponse.json({ error: "Phone verification required" }, { status: 400 })
    }
    if (!customer?.name || !customer?.phone || !address?.line1 || !address?.area || !address?.city || !/^\d{6}$/.test(address?.pincode || "")) {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 })
    }

    const amount = cart.reduce(
      (sum: number, i: any) => sum + i.price * i.quantity,
      0
    )

    // 1️⃣ Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
    })

    // 2️⃣ Create DB order (IMPORTANT: STATUS ENUM FIX BELOW)
    const order = await Order.create({
      userId: user._id.toString(),
      userAuthProvider: user.authProvider,
      userSnapshot: {
        name: customer?.name || user.name,
        phone: customer?.phone || user.phone,
        address,
      },
      items: cart.map((i: any) => ({
        productId: i._id,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
      })),
      amount,
      customer,
      payment: {
        razorpayOrderId: razorpayOrder.id,
        razorpay_order_id: razorpayOrder.id,
      },
      status: "CREATED", // 🔥 MUST MATCH ENUM (UPPERCASE)
    })

    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      orderId: order._id,
    })
  } catch (err: any) {
    console.error("Order create failed:", err)
    return NextResponse.json(
      { error: err.message || "Order create failed" },
      { status: 500 }
    )
  }
}
