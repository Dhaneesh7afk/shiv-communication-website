import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Order from "@/models/Order"
import { requireAdmin } from "@/lib/adminAuth"
import { canTransition } from "@/lib/order-status"
import { getRazorpay } from "@/lib/razorpay"

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const isAdmin = await requireAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const razorpay = getRazorpay()
  if (!razorpay) {
    return NextResponse.json({ error: "Razorpay not configured" }, { status: 503 })
  }

  await connectDB()
  const { id } = await params
  const order = await Order.findById(id)
  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const payment = order.payment || {}
  const razorpayOrderId = payment.razorpayOrderId || payment.razorpay_order_id
  if (!razorpayOrderId) {
    return NextResponse.json({ ok: true, status: order.status })
  }

  const razorpayOrder = await razorpay.orders.fetch(razorpayOrderId)
  if (razorpayOrder.status === "paid") {
    const payments = await razorpay.orders.fetchPayments(razorpayOrderId)
    const captured = payments.items?.find((p: any) => p.status === "captured")
    if (canTransition(order.status, "PAID")) {
      order.status = "PAID"
      order.payment = {
        ...payment,
        razorpayOrderId,
        razorpay_order_id: razorpayOrderId,
        razorpayPaymentId: captured?.id || payment.razorpayPaymentId,
        razorpay_payment_id: captured?.id || payment.razorpay_payment_id,
      }
      await order.save()
    }
  }

  const paymentId = order.payment?.razorpayPaymentId || order.payment?.razorpay_payment_id
  if (paymentId) {
    const paymentInfo = await razorpay.payments.fetch(paymentId)
    const refundedAmount = paymentInfo.amount_refunded ?? 0
    if (refundedAmount > 0 || paymentInfo.refund_status === "full") {
      order.payment = {
        ...order.payment,
        refundStatus: "REFUNDED",
      }
      await order.save()
    }
  }

  return NextResponse.json({ ok: true, status: order.status })
}
