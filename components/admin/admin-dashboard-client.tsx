"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  ClipboardList,
  Package,
  RefreshCw,
  Smartphone,
  TriangleAlert,
  Zap,
  Users,
  PackagePlus,
} from "lucide-react"
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

interface Order {
  _id: string
  amount: number
  status: string
  createdAt: string
  customer?: { name?: string; phone?: string }
}

interface Product {
  _id: string
  title: string
  stock: number
  isActive: boolean
}

interface UsedPhone {
  _id: string
  brand: string
  model: string
  price: number
  available: boolean
  images?: string[]
}

export default function AdminDashboardClient() {
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [phones, setPhones] = useState<UsedPhone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = async () => {
    setLoading(true)
    setError(null)
    try {
      const [ordersRes, productsRes, phonesRes] = await Promise.all([
        fetch("/api/orders", { cache: "no-store" }),
        fetch("/api/products", { cache: "no-store" }),
        fetch("/api/phones", { cache: "no-store" }),
      ])

      if (!ordersRes.ok || !productsRes.ok || !phonesRes.ok) {
        throw new Error("Failed to load admin data.")
      }

      const [ordersData, productsData, phonesData] = await Promise.all([
        ordersRes.json(),
        productsRes.json(),
        phonesRes.json(),
      ])

      setOrders(ordersData)
      setProducts(productsData)
      setPhones(phonesData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load admin data.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0)
    const pendingOrders = orders.filter((order) =>
      ["pending", "created"].some((status) => order.status?.toLowerCase().includes(status))
    ).length
    const activeProducts = products.filter((product) => product.isActive).length
    const lowStock = products.filter((product) => product.stock <= 3).length
    const availablePhones = phones.filter((phone) => phone.available).length

    return {
      totalOrders: orders.length,
      totalRevenue,
      pendingOrders,
      totalProducts: products.length,
      activeProducts,
      lowStock,
      totalPhones: phones.length,
      availablePhones,
    }
  }, [orders, products, phones])

  const recentOrders = useMemo(
    () =>
      [...orders]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    [orders]
  )

  const chartData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - index))
      const key = date.toISOString().slice(0, 10)
      return {
        key,
        label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        orders: 0,
        revenue: 0,
      }
    })
    const map = new Map(days.map((day) => [day.key, day]))
    orders.forEach((order) => {
      const key = new Date(order.createdAt).toISOString().slice(0, 10)
      const target = map.get(key)
      if (target) {
        target.orders += 1
        target.revenue += order.amount || 0
      }
    })
    return days
  }, [orders])

  const activityFeed = useMemo(() => {
    const feed: { title: string; meta: string; icon: typeof ClipboardList }[] = []
    if (stats.lowStock > 0) {
      feed.push({
        title: "Low stock alert",
        meta: `${stats.lowStock} products need restock`,
        icon: TriangleAlert,
      })
    }
    if (stats.pendingOrders > 0) {
      feed.push({
        title: "Pending orders",
        meta: `${stats.pendingOrders} orders awaiting action`,
        icon: ClipboardList,
      })
    }
    recentOrders.forEach((order) => {
      feed.push({
        title: `Order ₹${order.amount}`,
        meta: `${order.customer?.name || "Guest"} • ${new Date(order.createdAt).toLocaleDateString()}`,
        icon: Zap,
      })
    })
    return feed.slice(0, 6)
  }, [recentOrders, stats.lowStock, stats.pendingOrders])

  const currency = useMemo(
    () =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }),
    []
  )

  const weeklyRevenue = useMemo(
    () => chartData.reduce((sum, day) => sum + day.revenue, 0),
    [chartData]
  )
  const monthlyEstimate = weeklyRevenue * 4
  const yearlyGoal = Math.max(stats.totalRevenue * 1.2, 1)
  const yearlyPercent = Math.min(95, Math.round((stats.totalRevenue / yearlyGoal) * 100))
  const customerCount = stats.totalOrders ? Math.max(stats.totalOrders - stats.pendingOrders, 0) : 0

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Dashboard</h1>
        </div>
        <Button
          variant="outline"
          className="rounded-2xl font-semibold tracking-wide text-xs admin-btn-outline"
          onClick={fetchAll}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="admin-surface border-destructive/30 bg-destructive/10 text-sm text-destructive p-6">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {[
          {
            label: "Total Orders",
            value: stats.totalOrders,
            icon: ClipboardList,
            className: "from-sky-500/10 via-white to-white",
          },
          {
            label: "Total Revenue",
            value: currency.format(stats.totalRevenue),
            icon: ArrowUpRight,
            className: "from-indigo-500/10 via-white to-white",
          },
          {
            label: "Customers",
            value: customerCount,
            icon: Users,
            className: "from-emerald-500/10 via-white to-white",
          },
          {
            label: "Active Products",
            value: stats.activeProducts,
            icon: Package,
            className: "from-violet-500/10 via-white to-white",
          },
          {
            label: "Used Phones Live",
            value: stats.availablePhones,
            icon: Smartphone,
            className: "from-cyan-500/10 via-white to-white",
          },
          {
            label: "Pending Orders",
            value: stats.pendingOrders,
            icon: TriangleAlert,
            className: "from-rose-500/10 via-white to-white",
          },
        ].map((card) => (
          <div key={card.label} className={`admin-stat bg-gradient-to-br ${card.className}`}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium tracking-wide text-slate-500">{card.label}</p>
              <card.icon className="h-4 w-4 text-blue-500" />
            </div>
            <p className="mt-4 text-2xl font-black text-slate-900">{loading ? "—" : card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2.2fr,1fr]">
        <div className="admin-surface p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Revenue Updates</p>
              <h3 className="mt-2 text-xl font-black text-slate-900">Weekly Revenue Performance</h3>
            </div>
            <div className="admin-pill">Last 7 days</div>
          </div>
          <div className="mt-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barCategoryGap={24}>
                <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
                <XAxis dataKey="label" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "12px",
                    border: "1px solid rgba(226,232,240,0.9)",
                    color: "#0f172a",
                  }}
                />
                <Bar dataKey="revenue" fill="rgba(93,135,255,0.8)" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
              <p className="text-xs text-slate-500">Total Earnings</p>
              <p className="mt-2 text-2xl font-black text-slate-900">{currency.format(stats.totalRevenue)}</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
              <p className="text-xs text-slate-500">Orders This Week</p>
              <p className="mt-2 text-2xl font-black text-slate-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="admin-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Yearly Breakup</p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-2xl font-black text-slate-900">{currency.format(stats.totalRevenue)}</p>
                <p className="text-xs text-slate-500">{yearlyPercent}% of yearly goal</p>
              </div>
              <div className="relative h-24 w-24">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#5d87ff 0deg ${yearlyPercent * 3.6}deg, #e2e8f0 ${yearlyPercent * 3.6}deg 360deg)`,
                  }}
                />
                <div className="absolute inset-2 rounded-full bg-white" />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-slate-600">
                  {yearlyPercent}%
                </div>
              </div>
            </div>
          </div>

          <div className="admin-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Monthly Earnings</p>
            <p className="mt-3 text-2xl font-black text-slate-900">{currency.format(monthlyEstimate)}</p>
            <div className="mt-4 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5d87ff" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#5d87ff"
                    fill="url(#earningsGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <div className="admin-surface p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Recent Orders</p>
            <Link href="/admin/orders" className="text-xs font-semibold text-blue-600 hover:text-blue-500">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-900">₹{order.amount}</p>
                  <p className="text-xs text-slate-500">
                    {order.customer?.name || "Guest"} • {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {order.status}
                </span>
              </div>
            ))}
            {recentOrders.length === 0 && <p className="text-sm text-slate-500">No recent orders yet.</p>}
          </div>
        </div>

        <div className="admin-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Activity Feed</p>
          <div className="mt-4 space-y-3">
            {activityFeed.map((item, index) => (
              <div key={`${item.title}-${index}`} className="flex items-start gap-3 text-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.meta}</p>
                </div>
              </div>
            ))}
            {activityFeed.length === 0 && <p className="text-sm text-slate-500">No recent activity yet.</p>}
          </div>
          <div className="mt-6 grid gap-2">
            <Button asChild className="justify-start rounded-2xl admin-btn-primary">
              <Link href="/admin/products">
                <PackagePlus className="mr-2 h-4 w-4" />
                Add New Product
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start rounded-2xl admin-btn-outline">
              <Link href="/admin/inventory">
                <Smartphone className="mr-2 h-4 w-4" />
                Add Used Phone
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
