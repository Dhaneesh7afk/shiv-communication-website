import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import Order from "@/models/Order"
import { ProfileClient } from "@/components/account/profile-client"
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

export default async function AccountPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/login?next=/account")

  await connectDB()
  const user = await User.findById(session.user.id).lean()
  if (!user) redirect("/login?next=/account")

  const recentOrders = await Order.find({ userId: session.user.id }).sort({ createdAt: -1 }).limit(4)
  const totalOrders = await Order.countDocuments({ userId: session.user.id })
  const totalSpentAgg = await Order.aggregate([
    { $match: { userId: session.user.id } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ])
  const totalSpent = totalSpentAgg[0]?.total || 0
  const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })

  const initials = (user.name || user.email || "User")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part[0]?.toUpperCase())
    .join("")

  return (
    <div className={`${bodyFont.variable} ${displayFont.variable} font-[var(--font-body)]`}>
      <div className="min-h-screen bg-[#f0f2f2] dark:bg-slate-950 text-[#0f1111] dark:text-slate-100">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-10">
          <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Your Account</h1>
              <p className="mt-2 text-sm text-[#565959] dark:text-slate-400">Profile, addresses, orders.</p>
            </div>
            <nav className="grid grid-cols-3 gap-2 lg:hidden">
              <Link
                href="/account"
                className="rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0f1111] dark:text-slate-100"
              >
                Profile
              </Link>
              <Link
                href="/account/orders"
                className="rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565959] dark:text-slate-400"
              >
                Orders
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565959] dark:text-slate-400"
              >
                Support
              </Link>
            </nav>
          </header>

          <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
            <aside className="space-y-4 lg:sticky lg:top-24 self-start">
              <div className="rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-[#0f1111] text-white flex items-center justify-center text-sm font-semibold">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#0f1111] dark:text-slate-100">{user.name || "Account"}</p>
                    <p className="truncate text-xs text-[#565959] dark:text-slate-400">{user.email || user.phone || ""}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565959] dark:text-slate-400">
                  <span className="rounded-full border border-[#d5d9d9] dark:border-slate-800 bg-[#f7fafa] dark:bg-slate-800/60 px-3 py-1">
                    {user.authProvider || "Account"}
                  </span>
                  <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-emerald-700">
                    {user.phoneVerified ? "Phone Verified" : "Phone Pending"}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-[#f7fafa] dark:bg-slate-800/60 px-3 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565959] dark:text-slate-400">Orders</p>
                    <p className="mt-2 text-lg font-semibold text-[#0f1111] dark:text-slate-100">{totalOrders}</p>
                  </div>
                  <div className="rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-[#f7fafa] dark:bg-slate-800/60 px-3 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565959] dark:text-slate-400">Spent</p>
                    <p className="mt-2 text-lg font-semibold text-[#0f1111] dark:text-slate-100">{currency.format(totalSpent)}</p>
                  </div>
                </div>
              </div>

              <div className="hidden rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 p-2 lg:block">
                <nav className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-[0.12em]">
                  <Link href="/account" className="rounded-md bg-[#0f1111] px-4 py-3 text-white">
                    Profile
                  </Link>
                  <Link
                    href="/account/orders"
                    className="rounded-md border border-[#d5d9d9] dark:border-slate-800 px-4 py-3 text-[#565959] dark:text-slate-400 hover:bg-[#f7fafa] dark:bg-slate-800/60"
                  >
                    Orders
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-md border border-[#d5d9d9] dark:border-slate-800 px-4 py-3 text-[#565959] dark:text-slate-400 hover:bg-[#f7fafa] dark:bg-slate-800/60"
                  >
                    Support
                  </Link>
                </nav>
              </div>

              <div className="rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                <p className="pb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565959] dark:text-slate-400">
                  Recent orders
                </p>
                {recentOrders.length === 0 ? (
                  <p className="text-sm text-[#565959] dark:text-slate-400">No orders yet.</p>
                ) : (
                  <div className="space-y-3">
                    {recentOrders.map((order) => (
                      <Link
                        key={order._id}
                        href={`/account/orders/${order._id}`}
                        className="block rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-[#f7fafa] dark:bg-slate-800/60 px-3 py-3 text-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#0f1111] dark:text-slate-100">{currency.format(order.amount)}</span>
                          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                            {order.status}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-[#565959] dark:text-slate-400">
                          Order #{formatOrderNumber(order._id.toString())}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
                <div className="pt-3">
                  <Link
                    href="/account/orders"
                    className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565959] dark:text-slate-400 hover:text-[#0f1111] dark:text-slate-100"
                  >
                    View all
                  </Link>
                </div>
              </div>
            </aside>

            <div className="space-y-4">
              <div className="rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565959] dark:text-slate-400">Profile</p>
                    <p className="mt-2 text-sm text-[#565959] dark:text-slate-400">Update your details.</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565959] dark:text-slate-400">Orders</p>
                    <p className="mt-2 text-sm text-[#565959] dark:text-slate-400">Review orders & invoices.</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565959] dark:text-slate-400">Support</p>
                    <p className="mt-2 text-sm text-[#565959] dark:text-slate-400">Get support fast.</p>
                  </div>
                </div>
              </div>

              <ProfileClient
                user={{
                  name: user.name || "",
                  email: user.email || "",
                  phone: user.phone || "",
                  image: user.image || "",
                  address: user.address || {},
                  authProvider: user.authProvider || "",
                  phoneVerified: user.phoneVerified || false,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
