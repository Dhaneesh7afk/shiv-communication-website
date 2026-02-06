import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import Order from "@/models/Order"
import Product from "@/models/Product"
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

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect(`/login?next=/account/orders/${id}`)

  await connectDB()
  const order = await Order.findOne({ _id: id, userId: session.user.id }).lean()
  if (!order) redirect("/account/orders")

  const items = order.items || []
  const productIds = Array.from(
    new Set(items.map((item: any) => item.productId).filter(Boolean))
  )
  const products = productIds.length
    ? await Product.find({ _id: { $in: productIds } }, { slug: 1, images: 1 }).lean()
    : []
  const productMetaMap = new Map<string, { slug?: string; image?: string }>(
    products.map((product: any) => [product._id.toString(), { slug: product.slug, image: product.images?.[0] }])
  )
  const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })

  const orderNumber = formatOrderNumber(order._id.toString())
  const placedAt = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
  const statusOrder = ["CREATED", "PAID", "PACKED", "READY", "DELIVERED"]
  const statusIndex = statusOrder.indexOf(order.status)
  const isFailed = order.status === "FAILED" || order.status === "CANCELLED"
  const paymentMethod =
    order.payment?.razorpayPaymentId || order.payment?.razorpay_payment_id
      ? "Online (Razorpay)"
      : "Pay on delivery"

  const shippingName = order.userSnapshot?.name || order.customer?.name || "Customer"
  const shippingPhone = order.userSnapshot?.phone || order.customer?.phone || ""
  const addressLines = order.userSnapshot?.address
    ? [
        order.userSnapshot.address.line1,
        order.userSnapshot.address.area,
        order.userSnapshot.address.city,
        order.userSnapshot.address.pincode,
      ].filter(Boolean)
    : order.customer?.address
      ? [order.customer.address]
      : []

  return (
    <div className={`${bodyFont.variable} ${displayFont.variable} font-[var(--font-body)]`}>
      <div className="min-h-screen bg-[#f0f2f2] dark:bg-slate-950 text-[#0f1111] dark:text-slate-100">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#565959] dark:text-slate-400">
            <Link href="/account" className="text-[#007185] dark:text-sky-400 hover:underline">
              Account
            </Link>
            <span>/</span>
            <Link href="/account/orders" className="text-[#007185] dark:text-sky-400 hover:underline">
              Orders
            </Link>
            <span>/</span>
            <span className="text-[#0f1111] dark:text-slate-100">Order Details</span>
          </div>

          <header className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Order Details</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#565959] dark:text-slate-400">
                <span>Order placed {placedAt}</span>
                <span className="text-[#9aa1a1]">•</span>
                <span>Order #{orderNumber}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full border px-4 py-2 text-[0.65rem] uppercase tracking-[0.12em] ${
                  isFailed
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {order.status}
              </span>
              {order.status === "DELIVERED" && (
                <a
                  href={`/account/orders/${order._id}/invoice`}
                  className="inline-flex items-center justify-center rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-[#0f1111] dark:text-slate-100"
                >
                  Download invoice
                </a>
              )}
            </div>
          </header>

          <div className="mt-6 rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="grid gap-4 border-b border-[#d5d9d9] dark:border-slate-800 p-4 md:grid-cols-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#565959] dark:text-slate-400">Order placed</p>
                <p className="mt-2 text-sm font-medium text-[#0f1111] dark:text-slate-100">{placedAt}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#565959] dark:text-slate-400">Total</p>
                <p className="mt-2 text-sm font-medium text-[#0f1111] dark:text-slate-100">{currency.format(order.amount)}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#565959] dark:text-slate-400">Ship to</p>
                <p className="mt-2 text-sm font-medium text-[#0f1111] dark:text-slate-100">{shippingName}</p>
              </div>
              <div className="md:text-right">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#565959] dark:text-slate-400">Order #</p>
                <p className="mt-2 text-sm font-medium text-[#0f1111] dark:text-slate-100">{orderNumber}</p>
              </div>
            </div>

            <div className="grid gap-6 p-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <div className="rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                  <p className="text-xs font-semibold text-[#565959] dark:text-slate-400">Shipping Address</p>
                  <p className="mt-2 text-sm font-semibold text-[#0f1111] dark:text-slate-100">{shippingName}</p>
                  {shippingPhone && <p className="text-xs text-[#565959] dark:text-slate-400">{shippingPhone}</p>}
                  <div className="mt-2 space-y-1 text-xs text-[#565959] dark:text-slate-400">
                    {addressLines.length ? (
                      addressLines.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)
                    ) : (
                      <p>No address saved.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                  <p className="text-xs font-semibold text-[#565959] dark:text-slate-400">Payment method</p>
                  <p className="mt-2 text-sm font-semibold text-[#0f1111] dark:text-slate-100">{paymentMethod}</p>
                  <p className="mt-2 text-xs text-[#565959] dark:text-slate-400">
                    {order.payment?.razorpayPaymentId || order.payment?.razorpay_payment_id
                      ? "Payment confirmed."
                      : "Payment pending at delivery."}
                  </p>
                </div>

                <div className="rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                  <p className="text-xs font-semibold text-[#565959] dark:text-slate-400">Items</p>
                  <div className="mt-4 space-y-4">
                    {items.map((item: any) => {
                      const meta = productMetaMap.get(String(item.productId))
                      const productHref = meta?.slug ? `/product/${meta.slug}` : "/shop"
                      const productImage = meta?.image || "/placeholder.jpg"
                      return (
                        <div key={item.productId} className="flex flex-wrap gap-4 border-b border-[#d5d9d9] dark:border-slate-800 pb-4 last:border-b-0 last:pb-0">
                          <div className="h-20 w-20 overflow-hidden rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={productImage} alt={item.title || "Product"} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-[200px]">
                            <p className="text-sm font-semibold text-[#0f1111] dark:text-slate-100">{item.title}</p>
                            <p className="text-xs text-[#565959] dark:text-slate-400">Qty {item.quantity}</p>
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
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                  <p className="text-xs font-semibold text-[#565959] dark:text-slate-400">Order Summary</p>
                  <div className="mt-3 space-y-2 text-sm text-[#565959] dark:text-slate-400">
                    <div className="flex items-center justify-between">
                      <span>Items</span>
                      <span>{items.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Shipping</span>
                      <span>{currency.format(0)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Discount</span>
                      <span>{currency.format(0)}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-[#d5d9d9] dark:border-slate-800 pt-2 text-[#0f1111] dark:text-slate-100">
                      <span className="font-semibold">Grand Total</span>
                      <span className="font-semibold">{currency.format(order.amount)}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                  <p className="text-xs font-semibold text-[#565959] dark:text-slate-400">Shipment tracking</p>
                  {isFailed ? (
                    <p className="mt-3 text-sm text-[#565959] dark:text-slate-400">
                      This order is marked as {order.status.toLowerCase()}. If you need assistance, contact support.
                    </p>
                  ) : (
                    <div className="mt-4 space-y-3">
                      {statusOrder.map((step, index) => {
                        const isActive = index <= statusIndex
                        return (
                          <div key={step} className="flex items-center gap-3">
                            <span
                              className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-semibold ${
                                isActive
                                  ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                                  : "border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 text-[#9aa1a1]"
                              }`}
                            >
                              {index + 1}
                            </span>
                            <div className="flex flex-col">
                              <span className={`text-sm ${isActive ? "text-[#0f1111] dark:text-slate-100" : "text-[#565959] dark:text-slate-400"}`}>
                                {step === "CREATED" && "Order placed"}
                                {step === "PAID" && "Payment confirmed"}
                                {step === "PACKED" && "Packed"}
                                {step === "READY" && "Ready for pickup"}
                                {step === "DELIVERED" && "Delivered"}
                              </span>
                              {step === order.status && (
                                <span className="text-xs text-[#565959] dark:text-slate-400">Current stage</span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                      <div className="rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-[#f7fafa] dark:bg-slate-800/60 px-3 py-2 text-xs text-[#565959] dark:text-slate-400">
                        Tracking ID will appear here once the shipment is assigned.
                      </div>
                    </div>
                  )}
                </div>

                <div className="rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                  <p className="text-xs font-semibold text-[#565959] dark:text-slate-400">Need help?</p>
                  <p className="mt-3 text-sm text-[#565959] dark:text-slate-400">
                    For issues with your order, reach our team anytime.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-md border border-[#d5d9d9] dark:border-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f1111] dark:text-slate-100"
                    >
                      Contact support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/account/orders" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#007185] dark:text-sky-400 hover:underline">
              Back to orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
