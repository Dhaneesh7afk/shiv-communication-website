import { NextResponse } from "next/server"
import crypto from "crypto"
import { connectDB } from "@/lib/db"
import Order from "@/models/Order"
import { canTransition } from "@/lib/order-status"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("x-razorpay-signature")

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex")

  if (signature !== expectedSignature) {
    console.error("❌ Invalid webhook signature")
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const event = JSON.parse(body)

  try {
    await connectDB()

    // ✅ PAYMENT SUCCESS
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity
      const razorpayOrderId = payment.order_id

      const order = await Order.findOne({
        $or: [
          { "payment.razorpay_order_id": razorpayOrderId },
          { "payment.razorpayOrderId": razorpayOrderId },
        ],
      })

      if (order && canTransition(order.status, "PAID")) {
        order.status = "PAID"
        order.payment = {
          razorpayOrderId: payment.order_id,
          razorpayPaymentId: payment.id,
          razorpaySignature: signature,
          razorpay_order_id: payment.order_id,
          razorpay_payment_id: payment.id,
          razorpay_signature: signature,
        }
        await order.save()
      }

      console.log("✅ Order marked PAID:", razorpayOrderId)
    }

    // ❌ PAYMENT FAILED
    if (event.event === "payment.failed") {
      const payment = event.payload.payment.entity

      const order = await Order.findOne({
        $or: [
          { "payment.razorpay_order_id": payment.order_id },
          { "payment.razorpayOrderId": payment.order_id },
        ],
      })
      if (order && canTransition(order.status, "FAILED")) {
        order.status = "FAILED"
        await order.save()
      }

      console.log("❌ Payment failed:", payment.order_id)
    }

    // 💸 REFUND PROCESSED
    if (event.event === "refund.processed") {
      const refund = event.payload.refund.entity
      const paymentId = refund.payment_id

      const order = await Order.findOne({
        $or: [
          { "payment.razorpay_payment_id": paymentId },
          { "payment.razorpayPaymentId": paymentId },
        ],
      })

      if (order) {
        order.payment = {
          ...order.payment,
          refundStatus: "REFUNDED",
        }
        await order.save()
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error("Webhook error:", err)
    return NextResponse.json({ error: "Webhook error" }, { status: 500 })
  }
}
