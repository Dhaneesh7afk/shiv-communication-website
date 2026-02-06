import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Order from "@/models/Order"
import { requireAdmin } from "@/lib/adminAuth"
import { canTransition } from "@/lib/order-status"
import { getRazorpay } from "@/lib/razorpay"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function withRetry<T>(fn: () => Promise<T>, retries = 2, baseDelay = 500): Promise<T> {
  let attempt = 0
  while (true) {
    try {
      return await fn()
    } catch (err: any) {
      const statusCode = err?.statusCode || err?.status || err?.response?.status
      if (statusCode === 429 && attempt < retries) {
        await sleep(baseDelay * Math.pow(2, attempt))
        attempt += 1
        continue
      }
      throw err
    }
  }
}

export async function POST(req: Request) {
  const isAdmin = await requireAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const razorpay = getRazorpay()
  if (!razorpay) {
    return NextResponse.json({ error: "Razorpay not configured" }, { status: 503 })
  }

  const { orderIds } = await req.json()
  if (!Array.isArray(orderIds)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  await connectDB()
  const orders = await Order.find({ _id: { $in: orderIds } })

  const errors: { orderId: string; message: string }[] = []
  let rateLimited = false

  const processOrder = async (order: any) => {
    if (rateLimited) return
    try {
      const payment = order.payment || {}
      const razorpayOrderId = payment.razorpayOrderId || payment.razorpay_order_id
      if (!razorpayOrderId) return

      const canMarkPaid = canTransition(order.status, "PAID")
      const paymentId = payment.razorpayPaymentId || payment.razorpay_payment_id
      const needsRefundCheck = Boolean(paymentId) && payment.refundStatus !== "REFUNDED"

      if (canMarkPaid) {
        const razorpayOrder = await withRetry(() => razorpay.orders.fetch(razorpayOrderId))
        if (razorpayOrder.status === "paid") {
          let capturedId = payment.razorpayPaymentId || payment.razorpay_payment_id
          if (!capturedId) {
            const payments = await withRetry(() => razorpay.orders.fetchPayments(razorpayOrderId))
            const captured = payments.items?.find((p: any) => p.status === "captured")
            capturedId = captured?.id
          }
          order.status = "PAID"
          order.payment = {
            ...payment,
            razorpayOrderId,
            razorpay_order_id: razorpayOrderId,
            razorpayPaymentId: capturedId || payment.razorpayPaymentId,
            razorpay_payment_id: capturedId || payment.razorpay_payment_id,
          }
          await order.save()
        }
      }

      if (needsRefundCheck && order.status === "PAID") {
        const paymentInfo = await withRetry(() => razorpay.payments.fetch(paymentId))
        const refundedAmount = paymentInfo.amount_refunded ?? 0
        if (refundedAmount > 0 || paymentInfo.refund_status === "full") {
          order.payment = {
            ...order.payment,
            refundStatus: "REFUNDED",
          }
          await order.save()
        }
      }
    } catch (err: any) {
      const statusCode = err?.statusCode || err?.status || err?.response?.status
      const message = err?.error?.description || err?.message || "Sync failed"
      errors.push({ orderId: String(order._id), message })
      if (statusCode === 429) {
        rateLimited = true
      }
    }
  }

  const MAX_CONCURRENCY = 3
  let index = 0
  const nextOrder = () => {
    if (index >= orders.length) return null
    return orders[index++]
  }

  const workers = Array.from({ length: Math.min(MAX_CONCURRENCY, orders.length) }, async () => {
    while (!rateLimited) {
      const order = nextOrder()
      if (!order) return
      await processOrder(order)
      if (!rateLimited) {
        await sleep(80)
      }
    }
  })

  await Promise.all(workers)

  if (rateLimited) {
    return NextResponse.json(
      { ok: false, error: "Rate limited by Razorpay. Try again shortly.", errors },
      { status: 429 }
    )
  }

  return NextResponse.json({ ok: true, errors })
}
