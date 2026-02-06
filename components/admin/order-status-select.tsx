"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { getNextStatuses, OrderStatus } from "@/lib/order-status"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronDown } from "lucide-react"

export default function OrderStatusSelect({
  orderId,
  currentStatus,
  razorpayPaymentId,
}: {
  orderId: string
  currentStatus: OrderStatus
  razorpayPaymentId?: string | null
}) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus)
  const [loading, setLoading] = useState(false)
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null)
  const [showRefundPrompt, setShowRefundPrompt] = useState(false)

  const getLabel = (value: OrderStatus) => (value === "PAID" ? "RECEIVED" : value)

  const options = useMemo(() => {
    return [status, ...getNextStatuses(status)]
  }, [status])

  const updateStatus = async (nextStatus: OrderStatus) => {
    if (nextStatus === status) return
    setLoading(true)
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      })
      if (res.ok) {
        setStatus(nextStatus)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = (nextStatus: OrderStatus) => {
    if (nextStatus === status) return
    if (nextStatus === "CANCELLED" && razorpayPaymentId) {
      setPendingStatus(nextStatus)
      setShowRefundPrompt(true)
      return
    }
    updateStatus(nextStatus)
  }

  const confirmCancel = async () => {
    if (!pendingStatus) return
    await updateStatus(pendingStatus)
    setShowRefundPrompt(false)
    setPendingStatus(null)
  }

  return (
    <div className="admin-surface p-6 space-y-4">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted-foreground">Order Status</p>
        <p className="text-2xl font-black">{getLabel(status)}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
            className="h-11 appearance-none rounded-full border border-emerald-500/20 bg-white/80 px-4 pr-10 text-sm font-semibold dark:bg-slate-900/70"
            disabled={options.length <= 1 || loading}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {getLabel(option)}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Button
          variant="outline"
          className="rounded-full font-semibold tracking-wide text-xs admin-btn-outline"
          disabled={loading || options.length <= 1}
          onClick={() => updateStatus(status)}
        >
          {loading ? "Saving..." : "Save Status"}
        </Button>
      </div>

      <Dialog open={showRefundPrompt} onOpenChange={setShowRefundPrompt}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Refund Required</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              This order has a captured payment. Before cancelling, please issue a refund in Razorpay.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://dashboard.razorpay.com/app/payments/${razorpayPaymentId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground hover:text-emerald-600"
              >
                Open Razorpay Payment
              </a>
              <Button
                className="rounded-full font-semibold tracking-wide text-xs"
                onClick={confirmCancel}
              >
                Confirm Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
