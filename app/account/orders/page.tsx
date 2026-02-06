import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Order from "@/models/Order"
import Product from "@/models/Product"
import { connectDB as db } from "@/lib/db"
import { Chakra_Petch, IBM_Plex_Sans } from "next/font/google"

const displayFont = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
})
const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
})

const formatOrderNumber = (id: string) => {
  try {
    const hex = id.replace(/[^a-fA-F0-9]/g, "")
    const digits = BigInt(`0x${hex}`).toString().slice(-17).padStart(17, "0")
    return `${digits.slice(0, 3)}-${digits.slice(3, 10)}-${digits.slice(10)}`
  } catch {
    return id.slice(-12)
  }
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; year?: string }>
}) {
  const { q = "", year = "all" } = (await searchParams) || {}
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/login?next=/account/orders")

  await db()

  const orders = await Order.find({ userId: session.user.id }).sort({ createdAt: -1 })
  const productIds = Array.from(
    new Set(
      orders
        .flatMap((order: any) => order.items || [])
        .map((item: any) => item.productId)
        .filter(Boolean)
    )
  )
  const products = productIds.length
    ? await Product.find({ _id: { $in: productIds } }, { slug: 1, images: 1 }).lean()
    : []
  const productMetaMap = new Map<string, { slug?: string; image?: string }>(
    products.map((product: any) => [product._id.toString(), { slug: product.slug, image: product.images?.[0] }])
  )
  const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })
  const years = Array.from(
    new Set(
      orders
        .map((order) => {
          const date = new Date(order.createdAt)
          return Number.isNaN(date.getTime()) ? null : date.getFullYear()
        })
        .filter((value): value is number => value !== null)
    )
  ).sort((a, b) => b - a)

  let filteredOrders = orders
  if (q.trim()) {
    const term = q.trim().toLowerCase()
    filteredOrders = filteredOrders.filter((order) => {
      const idMatch = order._id.toString().toLowerCase().includes(term)
      const statusMatch = order.status?.toLowerCase().includes(term)
      const itemMatch = (order.items || []).some((item: any) =>
        `${item.title ?? ""}`.toLowerCase().includes(term)
      )
      return idMatch || statusMatch || itemMatch
    })
  }
  if (year !== "all") {
    const targetYear = Number(year)
    filteredOrders = filteredOrders.filter((order) => {
      const date = new Date(order.createdAt)
      return !Number.isNaN(date.getTime()) && date.getFullYear() === targetYear
    })
  }

  return (
    <div className={`${bodyFont.variable} ${displayFont.variable} font-[var(--font-body)]`}>
      <div className="min-h-screen bg-[#f0f2f2] dark:bg-slate-950 text-[#0f1111] dark:text-slate-100 pb-20">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#565959] dark:text-slate-400">
            <Link href="/account" className="text-[#007185] dark:text-sky-400 hover:underline">
              Your Account
            </Link>
            <span>/</span>
            <span className="text-[#0f1111] dark:text-slate-100">Your Orders</span>
          </div>

          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Your Orders</h1>
            </div>
            <form className="flex w-full flex-wrap items-center gap-2 md:w-auto" method="get">
              <input
                name="q"
                defaultValue={q}
                placeholder="Search all orders"
                className="h-9 w-full rounded-md border border-[#888c8c] bg-white dark:bg-slate-900 px-3 text-sm outline-none md:w-[260px]"
              />
              <button
                type="submit"
                className="h-9 rounded-md bg-[#0f1111] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-white"
              >
                Search Orders
              </button>
            </form>
          </div>

          <div className="mt-4 border-b border-[#d5d9d9] dark:border-slate-800">
            <nav className="flex flex-wrap gap-6 text-sm font-semibold">
              <span className="border-b-2 border-[#0f1111] pb-3 text-[#0f1111] dark:text-slate-100">Orders</span>
            </nav>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#565959] dark:text-slate-400">
            <span className="font-semibold text-[#0f1111] dark:text-slate-100">
              {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"} placed in
            </span>
            <form method="get" className="flex items-center gap-2">
              <input type="hidden" name="q" value={q} />
              <select
                name="year"
                defaultValue={year}
                className="h-8 rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-sm"
              >
                <option value="all">All years</option>
                {years.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="h-8 rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#565959] dark:text-slate-400"
              >
                Apply
              </button>
            </form>
          </div>

          <div className="mt-6 space-y-6">
            {filteredOrders.length === 0 && (
              <div className="rounded-lg border border-dashed border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center text-[#565959] dark:text-slate-400">
                No orders found.
              </div>
            )}

            {filteredOrders.map((order) => {
              const placedAt = new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
              const shipTo = order.userSnapshot?.name || order.customer?.name || "Customer"
              const orderNumber = formatOrderNumber(order._id.toString())
              const delivered = order.status === "DELIVERED"
              return (
                <div key={order._id} className="rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="grid gap-4 border-b border-[#d5d9d9] dark:border-slate-800 bg-[#f7fafa] dark:bg-slate-800/60 p-4 text-xs text-[#565959] dark:text-slate-400 md:grid-cols-[1.1fr_0.9fr_1fr_1.4fr]">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em]">Order placed</p>
                      <p className="mt-2 text-sm font-semibold text-[#0f1111] dark:text-slate-100">{placedAt}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em]">Total</p>
                      <p className="mt-2 text-sm font-semibold text-[#0f1111] dark:text-slate-100">{currency.format(order.amount)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em]">Ship to</p>
                      <p className="mt-2 text-sm font-semibold text-[#0f1111] dark:text-slate-100">{shipTo}</p>
                    </div>
                    <div className="md:text-right">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em]">Order # {orderNumber}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 md:justify-end">
                        <Link
                          href={`/account/orders/${order._id}`}
                          className="text-xs font-semibold text-[#007185] dark:text-sky-400 hover:underline"
                        >
                          View order details
                        </Link>
                        {delivered && (
                          <a
                            href={`/account/orders/${order._id}/invoice`}
                            className="text-xs font-semibold text-[#007185] dark:text-sky-400 hover:underline"
                          >
                            Invoice
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    {(order.items || []).map((item: any) => {
                      const meta = productMetaMap.get(String(item.productId))
                      const productHref = meta?.slug ? `/product/${meta.slug}` : "/shop"
                      const productImage = meta?.image || "/placeholder.jpg"
                      return (
                      <div key={item.productId} className="flex flex-wrap gap-4 border-b border-[#d5d9d9] dark:border-slate-800 py-4 last:border-b-0">
                        <div className="h-20 w-20 overflow-hidden rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={productImage} alt={item.title || "Product"} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-[200px]">
                          <p className="text-sm font-semibold text-[#0f1111] dark:text-slate-100">{item.title}</p>
                          <p className="mt-1 text-xs text-[#565959] dark:text-slate-400">Qty {item.quantity}</p>
                          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                            <Link
                              href={productHref}
                              className="rounded-md border border-[#fcd200] bg-[#ffd814] px-3 py-1 text-[#0f1111] dark:bg-amber-300 dark:text-slate-900"
                            >
                              Buy it again
                            </Link>
                            <Link
                              href={productHref}
                              className="rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1 text-[#0f1111] dark:text-slate-100"
                            >
                              View your item
                            </Link>
                          </div>
                        </div>
                        <div className="ml-auto text-right">
                          <p className="text-sm font-semibold text-[#0f1111] dark:text-slate-100">{currency.format(item.price || 0)}</p>
                          <p className="text-xs text-[#565959] dark:text-slate-400">
                            Subtotal {currency.format((item.price || 0) * (item.quantity || 0))}
                          </p>
                        </div>
                      </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
