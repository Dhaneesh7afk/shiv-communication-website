"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Order {
  _id: string
  amount: number
  status: string
  createdAt: string
  customer?: {
    name: string
    phone: string
    address: string
  }
  payment?: {
    refundStatus?: string
    razorpayPaymentId?: string
    razorpay_payment_id?: string
  }
  items: {
    title: string
    price: number
    quantity: number
  }[]
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const fetchOrders = async (sync = false) => {
    setLoading(true)
    if (sync && orders.length > 0) {
      await fetch("/api/orders/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderIds: orders.map((order) => order._id) }),
      })
    }

    const res = await fetch("/api/orders", {
      cache: "no-store",
    })

    if (res.ok) {
      const data = await res.json()
      setOrders(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders(true)
    }, 45000)
    return () => clearInterval(interval)
  }, [orders.length])

  const statusOptions = useMemo(() => {
    const statuses = Array.from(new Set(orders.map((order) => order.status)))
    return ["all", ...statuses]
  }, [orders])

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesQuery =
        query.trim().length === 0 ||
        order._id.toLowerCase().includes(query.toLowerCase()) ||
        order.customer?.name?.toLowerCase().includes(query.toLowerCase()) ||
        order.customer?.phone?.includes(query)
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [orders, query, statusFilter])

  const metrics = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0)
    const pendingCount = orders.filter((order) =>
      ["pending", "created"].some((status) => order.status?.toLowerCase().includes(status))
    ).length
    return {
      totalRevenue,
      pendingCount,
    }
  }, [orders])

  const getStatusLabel = (value: string) => (value === "PAID" ? "RECEIVED" : value)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Orders</h1>
        </div>
        <Button
          variant="outline"
          className="rounded-full font-semibold tracking-wide text-xs admin-btn-outline"
          onClick={() => fetchOrders(true)}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Sync Orders
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total Orders", value: orders.length },
          { label: "Pending Orders", value: metrics.pendingCount },
          { label: "Total Revenue", value: `₹${metrics.totalRevenue}` },
        ].map((stat) => (
          <div key={stat.label} className="admin-stat">
            <p className="text-xs font-medium tracking-wide text-muted-foreground">{stat.label}</p>
            <p className="mt-4 text-2xl font-black">{loading ? "—" : stat.value}</p>
          </div>
        ))}
      </div>

      <div className="admin-surface p-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search by order ID or customer..."
              className="pl-9 rounded-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-white/70 px-3 py-2 text-xs font-medium tracking-wide text-muted-foreground dark:bg-slate-900/70">
              <Filter className="h-3 w-3" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent outline-none"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
            <div className="rounded-2xl bg-secondary/30 p-6 text-sm text-muted-foreground">
              Loading orders...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="rounded-2xl border border-dashed bg-secondary/10 p-10 text-center text-muted-foreground">
              No orders found.
            </div>
          ) : (
            <>
              <div className="space-y-4 md:hidden">
                {filteredOrders.map((order) => (
                  <div key={order._id} className="admin-list-item p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium tracking-wide text-muted-foreground">Order ID</p>
                        <p className="font-semibold break-all">{order._id}</p>
                        <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                      <p className="text-sm font-black text-emerald-600">₹{order.amount}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium tracking-wide text-emerald-600">
                        {getStatusLabel(order.status)}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-medium tracking-wide ${
                          order.payment?.refundStatus === "REFUNDED"
                            ? "bg-red-100 text-red-700"
                            : order.status === "PAID" ||
                              Boolean(order.payment?.razorpayPaymentId || order.payment?.razorpay_payment_id)
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {order.payment?.refundStatus === "REFUNDED"
                          ? "Refunded"
                          : order.status === "PAID" ||
                            Boolean(order.payment?.razorpayPaymentId || order.payment?.razorpay_payment_id)
                          ? "Paid"
                          : "Pending"}
                      </span>
                    </div>
                    <div className="mt-4 text-sm">
                      <p className="font-semibold">Customer</p>
                      <p className="text-muted-foreground">
                        {order.customer?.name || "Guest"} • {order.customer?.phone || "N/A"}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                      <a
                        href={`/admin/orders/${order._id}`}
                        className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium tracking-wide text-emerald-600"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden md:block">
                <div className="overflow-x-auto">
                  <table className="admin-table w-full border-separate border-spacing-y-3">
                    <thead>
                      <tr className="text-left text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        <th className="px-4">Order</th>
                        <th className="px-4">Customer</th>
                        <th className="px-4">Amount</th>
                        <th className="px-4">Status</th>
                        <th className="px-4">Payment</th>
                        <th className="px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order._id} className="bg-white/80 dark:bg-slate-900/60">
                          <td className="px-4 py-4 rounded-l-2xl border-y border-l border-emerald-500/10">
                            <p className="font-semibold break-all">{order._id}</p>
                            <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                          </td>
                          <td className="px-4 py-4 border-y border-emerald-500/10">
                            <p className="font-semibold">{order.customer?.name || "Guest"}</p>
                            <p className="text-xs text-muted-foreground">{order.customer?.phone || "N/A"}</p>
                          </td>
                          <td className="px-4 py-4 border-y border-emerald-500/10 font-semibold text-emerald-600">
                            ₹{order.amount}
                          </td>
                          <td className="px-4 py-4 border-y border-emerald-500/10">
                            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium tracking-wide text-emerald-600">
                              {getStatusLabel(order.status)}
                            </span>
                          </td>
                          <td className="px-4 py-4 border-y border-emerald-500/10">
                            <span
                              className={`rounded-full px-3 py-1 text-[11px] font-medium tracking-wide ${
                                order.payment?.refundStatus === "REFUNDED"
                                  ? "bg-red-100 text-red-700"
                                  : order.status === "PAID" ||
                                    Boolean(order.payment?.razorpayPaymentId || order.payment?.razorpay_payment_id)
                                  ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {order.payment?.refundStatus === "REFUNDED"
                                ? "Refunded"
                                : order.status === "PAID" ||
                                  Boolean(order.payment?.razorpayPaymentId || order.payment?.razorpay_payment_id)
                                ? "Paid"
                                : "Pending"}
                            </span>
                          </td>
                          <td className="px-4 py-4 rounded-r-2xl border-y border-r border-emerald-500/10 text-right">
                            <a
                              href={`/admin/orders/${order._id}`}
                              className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold tracking-wide text-emerald-600"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  )
}
