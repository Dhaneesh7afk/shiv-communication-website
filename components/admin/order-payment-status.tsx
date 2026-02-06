"use client"

import { useEffect, useState } from "react"
import { RefreshCw, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrderPaymentStatus({
  orderId,
  initialStatus,
  initialRazorpayOrderId,
  initialRazorpayPaymentId,
}: {
  orderId: string
  initialStatus: string
  initialRazorpayOrderId?: string | null
  initialRazorpayPaymentId?: string | null
}) {
  const [status, setStatus] = useState(initialStatus)
  const [razorpayOrderId, setRazorpayOrderId] = useState(
    initialRazorpayOrderId || null
  )
  const [razorpayPaymentId, setRazorpayPaymentId] = useState(
    initialRazorpayPaymentId || null
  )
  const [refundStatus, setRefundStatus] = useState<string | null>(null)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [loading, setLoading] = useState(false)

  const refresh = async () => {
    setLoading(true)
    try {
      await fetch(`/api/orders/${orderId}/sync`, {
        method: "POST",
      })
      const res = await fetch(`/api/orders/${orderId}`, { cache: "no-store" })
      if (!res.ok) return
      const data = await res.json()
      const payment = data.payment || {}
      setStatus(data.status)
      setRazorpayOrderId(
        payment.razorpayOrderId || payment.razorpay_order_id || null
      )
      setRazorpayPaymentId(
        payment.razorpayPaymentId || payment.razorpay_payment_id || null
      )
      setRefundStatus(payment.refundStatus || null)
      setLastChecked(new Date())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, 15000)
    return () => clearInterval(interval)
  }, [])

  const isRefunded = refundStatus === "REFUNDED"
  const isPaid = status === "PAID" || Boolean(razorpayPaymentId)
  const razorpayOrderUrl = razorpayOrderId
    ? `https://dashboard.razorpay.com/app/orders/${razorpayOrderId}`
    : null
  const razorpayPaymentUrl = razorpayPaymentId
    ? `https://dashboard.razorpay.com/app/payments/${razorpayPaymentId}`
    : null

  return (
    <div className="admin-surface p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground">
            Payment Status
          </p>
          <p className={isRefunded ? "text-2xl font-black text-emerald-600" : isPaid ? "text-2xl font-black text-emerald-600" : "text-2xl font-black text-amber-600"}>
            {isRefunded ? "Refunded" : isPaid ? "Paid" : status}
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-full font-semibold tracking-wide text-xs admin-btn-outline"
          onClick={refresh}
          disabled={loading}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          {loading ? "Refreshing" : "Refresh"}
        </Button>
      </div>

      <div className="text-xs text-muted-foreground">
        Auto-refresh every 15s
        {lastChecked ? ` • Last checked ${lastChecked.toLocaleTimeString()}` : ""}
      </div>

      <div className="space-y-2 text-sm">
        <p>
          <span className="text-muted-foreground">Order ID:</span>{" "}
          {razorpayOrderId || "Not available"}
        </p>
        <p>
          <span className="text-muted-foreground">Payment ID:</span>{" "}
          {razorpayPaymentId || "Not available"}
        </p>
        <p>
          <span className="text-muted-foreground">Refund:</span>{" "}
          {refundStatus === "REFUNDED" ? "Refunded" : "Not refunded"}
        </p>
      </div>

      <div className="space-y-2">
        {razorpayOrderUrl ? (
          <a
            href={razorpayOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-xs font-medium tracking-wide text-muted-foreground hover:text-emerald-600"
          >
            View Razorpay Order
            <ArrowUpRight className="h-3 w-3" />
          </a>
        ) : (
          <div className="rounded-2xl border border-dashed px-4 py-3 text-xs font-medium tracking-wide text-muted-foreground">
            Razorpay order link not available
          </div>
        )}
        {razorpayPaymentUrl ? (
          <a
            href={razorpayPaymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-xs font-medium tracking-wide text-muted-foreground hover:text-emerald-600"
          >
            View Razorpay Payment
            <ArrowUpRight className="h-3 w-3" />
          </a>
        ) : (
          <div className="rounded-2xl border border-dashed px-4 py-3 text-xs font-medium tracking-wide text-muted-foreground">
            Payment link not available
          </div>
        )}
      </div>
    </div>
  )
}
