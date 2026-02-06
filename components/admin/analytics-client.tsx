"use client"

import { useEffect, useMemo, useState } from "react"
import { RefreshCw, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface AnalyticsData {
  todayRevenue: number
  monthRevenue: number
  totalOrders: number
  totalCustomers: number
  topProduct: { _id: string; quantity: number; revenue: number } | null
  bestCustomer: { name?: string; phone?: string; totalSpent?: number; orderCount?: number } | null
  ordersPerDay: { _id: string; count: number }[]
  revenuePerDay: { _id: string; total: number }[]
}

export default function AnalyticsClient() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchAnalytics = async () => {
    setLoading(true)
    const res = await fetch("/api/analytics", { cache: "no-store" })
    if (res.ok) {
      const payload = await res.json()
      setData(payload)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const ordersSeries = useMemo(() => {
    if (!data) return []
    return data.ordersPerDay.map((item) => ({
      date: new Date(item._id).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: item.count,
    }))
  }, [data])

  const revenueSeries = useMemo(() => {
    if (!data) return []
    return data.revenuePerDay.map((item) => ({
      date: new Date(item._id).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: item.total,
    }))
  }, [data])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black">Analytics</h1>
        </div>
        <Button
          variant="outline"
          className="rounded-full font-semibold tracking-wide text-xs admin-btn-outline"
          onClick={fetchAnalytics}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Today's Revenue", value: `₹${data?.todayRevenue ?? 0}` },
          { label: "This Month", value: `₹${data?.monthRevenue ?? 0}` },
          { label: "Total Orders", value: data?.totalOrders ?? 0 },
          { label: "Total Customers", value: data?.totalCustomers ?? 0 },
          { label: "Top Product", value: data?.topProduct ? data.topProduct._id : "N/A" },
          { label: "Best Customer", value: data?.bestCustomer?.name || data?.bestCustomer?.phone || "N/A" },
        ].map((stat) => (
          <div key={stat.label} className="admin-stat">
            <p className="text-xs font-medium tracking-wide text-muted-foreground">{stat.label}</p>
            <p className="mt-4 text-2xl font-black">{loading ? "—" : stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="admin-surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Orders Trend
              </p>
              <h2 className="text-lg font-black">Last 7 Days</h2>
            </div>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersSeries} margin={{ left: 0, right: 0, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.25)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15, 23, 42, 0.9)",
                    borderRadius: 14,
                    border: "1px solid rgba(20,184,166,0.3)",
                    color: "#fff",
                  }}
                  labelStyle={{ color: "#94a3b8" }}
                />
                <Bar dataKey="value" fill="#14b8a6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Revenue Trend
              </p>
              <h2 className="text-lg font-black">Last 7 Days</h2>
            </div>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries} margin={{ left: 0, right: 0, top: 8 }}>
                <defs>
                  <linearGradient id="analyticsRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.25)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15, 23, 42, 0.9)",
                    borderRadius: 14,
                    border: "1px solid rgba(20,184,166,0.3)",
                    color: "#fff",
                  }}
                  labelStyle={{ color: "#94a3b8" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  fill="url(#analyticsRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
